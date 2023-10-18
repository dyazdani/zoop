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

// DELETE /api/zoops/:id
// TODO: Add auth middleware to check if user is logged in once it is available from merging of login endpoint branch
zoopsRouter.delete(`/:id`, async (req, res, next) => {
    //TODO: Create req.user with middleware that sends json web token
    const userId = req.user.id;
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