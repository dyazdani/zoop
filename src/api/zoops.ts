import express, {Request, Response, NextFunction} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const zoopsRouter = express.Router();

//TODO: Declare a custom type that extends Request for Express to use
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
zoopsRouter.post("/:id/faves", async (req: any, res, next): Promise<void> => {
    try {
        console.log("starting fave")
        const id = Number(req.params.id);
        console.log("zoop ID: ", id)
        const zoop = await prisma.zoop.findUniqueOrThrow({
            where: {id: id}
        });
        console.log("got zoop here: ", zoop)
        const faverId = Number(req.user.id);
        console.log("Faver ID: ", faverId)
        if (Number(zoop.authorId) !== faverId) {
            console.log("Faver is not Zooper")
            const fave = await prisma.fave.create({
                data: {
                    faverId: faverId,
                    zoopId: id
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

export default zoopsRouter;
