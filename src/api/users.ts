import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticateJWT from "../utils/auth";
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
import excludePassword from "../utils/exclude";
import requireUser from "../utils/requireUser";

const SALT_ROUNDS = 10;

const prisma = new PrismaClient();

const {ACCESS_TOKEN_SECRET} = process.env;

const usersRouter = express.Router();


// GET /api/users/me
usersRouter.get("/me", requireUser, async (req, res, next): Promise<void> => {
    if (req.user) {
        try {
            const user = await prisma.user.findUniqueOrThrow({ 
                where: {
                    id: req.user.id
                }
            });
            
            res.send({user: excludePassword(user)});
        } catch (e) {
            next(e);
        }
    }
})

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        bcrypt.hash(password, SALT_ROUNDS, async function(err: Error | undefined, hash: string) {
            if (err) next(err);
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

export default usersRouter;