import express from "express";
import { PrismaClient } from "@prisma/client";

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
// TODO: add auth
// TODO: change from where authorId is obtained
zoopsRouter.post("/", async (req, res, next): Promise<void> => {
    try {
        const {content, authorId, receiverId} = req.body;
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
})

// PUT /api/zoops/:id
//TODO: add auth middleware function when auth.ts file is available for import
zoopsRouter.put("/:id", async (req, res, next)=> {
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

export default zoopsRouter;
