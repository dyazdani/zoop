import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const usersRouter = express.Router();

// GET /api/users

usersRouter.get("/", async (req, res, next): Promise<void> => {
    try {
        const users = await prisma.user.findMany();
        res.send({users});
    } catch (e) {
        next(e);
    }
})

// POST /api/users

usersRouter.post("/", async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password
            }
        })
        res.send({user});
    } catch (e) {
        next(e)
    }
})

export default usersRouter;