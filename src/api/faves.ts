import express from 'express';
import { PrismaClient } from "@prisma/client";
import requireUser from "../utils/requireUser";

const prisma = new PrismaClient();

const favesRouter = express.Router();


// POST /api/faves
favesRouter.post("/", requireUser, async (req, res, next): Promise<void> => {
    try {
        const {zoopId} = req.body;
        const zoop = await prisma.zoop.findUniqueOrThrow({
            where: {id: Number(zoopId)}
        });
        const faverId = Number(req.user?.id);
        if (Number(zoop.authorId) !== faverId) {
            const fave = await prisma.fave.create({
                data: {
                    faverId: faverId,
                    zoopId: zoopId
                }
            })
            res.send({fave});
        } else {
            res.status(403)
                .send({message: 'Cannot fave your own Zoops'})
        }
    } catch (e) {
        next(e);
    }
})

// DELETE /api/faves/:id
favesRouter.delete("/:id", requireUser, async (req: any, res, next): Promise<void> => {
    try {
        const userId = req.user?.id;
        const { faveId } = req.body;
        const fave = await prisma.fave.findUniqueOrThrow({
            where: {
                id: Number(faveId) 
            }
        })
        
        if (!fave) {
            next({name: "NotFound", message: "Could not find fave"})
        } else if (userId === fave.faverId) {
            const deletedFave = await prisma.fave.delete({
                where: {
                    id: faveId
                }
            })

            res.send({success: true});
        } else {
            res.status(403)
                .send({message: "Only author of fave can delete fave"});
        }
    } catch (e) {
        next(e);
    }
})


export default favesRouter;