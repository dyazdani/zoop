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

export default zoopsRouter;