import express from "express";
import { PrismaClient } from "@prisma/client";
import requireUser from "../utils/requireUser";

const prisma = new PrismaClient();

const zoopsRouter = express.Router();


// GET /api/zoops
zoopsRouter.get("/", async (req, res, next): Promise<void> => {
  try {
    const zoops = await prisma.zoop.findMany();
    res.send({zoops});
  } catch (e) {
    next(e);
  }
})

// Get /api/zoops/:id
zoopsRouter.get("/:id", async (req, res, next) => {
  try {
    const zoopId = Number(req.params.id);
    const zoop = await prisma.zoop.findUniqueOrThrow({
      where: {
        id: zoopId,
      },
    });
    res.send({ zoop });
  } catch (e) {
    next(e);
  }
});

// POST /api/zoops
zoopsRouter.post("/", requireUser, async (req, res, next): Promise<void> => {
    if (req.user) {
        try {
            const {content, receiverId} = req.body;
            const authorId = req.user?.id
            console.log(authorId)
            const zoop = await prisma.zoop.create({
                data: {
                    content,
                    authorId,
                    receiverId
                }
            })
            res.send({zoop});
        } catch (e) {
            next(e)
        }
    } else {
        console.log("no user")
        next();
    }
    
})

// PUT /api/zoops/:id
zoopsRouter.put("/:id", requireUser, async (req, res, next)=> {
    try {
        const {id} = req.params;
        const {content} = req.body;
        const zoop = await prisma.zoop.update({
            where: {id: Number(id)},
            data: {content}
        })
        res.send({zoop});
    } catch (e) {
        next(e);
    }
})


// DELETE /api/zoops/:id
zoopsRouter.delete(`/:id`, requireUser, async (req, res, next) => {
    const userId = req.user && req.user.id;
    try {
        const { id } = req.params
        const zoop = await prisma.zoop.findUniqueOrThrow({
            where: {id: Number(id)}
        })
        if (userId === zoop.authorId || userId === zoop.receiverId) {
            const deletedZoop = await prisma.zoop.delete({
                where: {
                    id: Number(id),
                },
            })
            res.send(deletedZoop)
        } else {
            res.status(403)
                .send({message: 'Only author or receiver of zoop may delete zoop'})
        }
    } catch (e) {
        next(e);
    }
  })

export default zoopsRouter;
