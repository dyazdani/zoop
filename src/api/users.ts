import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const usersRouter = express.Router();

// GET /api/users
//TODO: Delete or restrict this endpoint to admin or logged in user.
//TODO: Strip password for users object if this route is kept.

usersRouter.get("/", async (req, res, next): Promise<void> => {
    try {
        const users = await prisma.user.findMany();
        res.send({users});
    } catch (e) {
        next(e);
    }
})

// POST /api/users
// TODO: Delete this endpoint when /api/users/register is added.
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