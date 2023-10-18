import express, {Request, Response, NextFunction} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const zoopsRouter = express.Router();

export interface ReqWithUser extends Request {
    user: {
        id: number | string
    }
}

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

// POST /api/zoops/:id/faves
//TODO: add auth middleware function when auth.ts file is available for import
//TODO: Fix TS error with ReqWithUser type
zoopsRouter.post("/:id/faves", async (req: ReqWithUser, res, next): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const userId = Number(req.user.id)
        const fave = await prisma.fave.create({
            data: {
                faverId: userId,
                zoopId: id
            }
        })
        res.send({fave});
    } catch (e) {
        next(e);
    }
})

export default zoopsRouter;