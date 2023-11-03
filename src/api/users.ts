import express from "express";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

const prisma = new PrismaClient();

const {ACCESS_TOKEN_SECRET} = process.env;

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

usersRouter.post("/register", async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        bcrypt.hash(password, SALT_ROUNDS, async function(err: Error | undefined, hash: string) {
            const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hash
            }
        })
        // JSON Web Token returned to client
        const token = jwt.sign({
            username: user.username,
            id: user.id,
        }, ACCESS_TOKEN_SECRET);
        
        res.send({
            token,
            user: {
                email: user.email,
                username: user.username
            }
        });
    })
    } catch (e) {
        next(e)
    }
})

usersRouter.post("/login", async (req, res, next) => {
    try {
        // throw new Error("An error");
        const { email, password } = req.body;

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: email
            }
        })

        bcrypt.compare(password, user.password, async function (err: Error | undefined, result: boolean) {
            if (err) {
                console.error("Error in bcrypt.compare:", err);
                res.status(500).send({ error: "Internal Server Error" });
                return;
            }
            if(result) {
                // JSON Web Token returned to client
               const token = jwt.sign({
                   username: user.username,
                   id: user.id,
               }, ACCESS_TOKEN_SECRET);
               
               res.send({
                   token,
                   user: {
                       email: user.email,
                       username: user.username
                   }
               });
            } else {
                next({name: "IncorrectPassword", message: "The password you entered is incorrect"})
            }
        })
    } catch(e) {
        next(e);
    }
})

export default usersRouter;

