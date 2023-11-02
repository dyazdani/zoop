import express, {Request, NextFunction} from 'express';
const jwt = require('jsonwebtoken');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// TODO: Test out this middleware once login endpoint is done and returns a JSON web token
const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(' ')[1];
        try {
            const {id} = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const user = await prisma.user.findUniqueOrThrow({
                where: {
                    id: id
            }
        })

        if (req.user) {
            delete req.user.password;
        }

        req.user = user;
        } catch (e) {
            next(e);
        } 
    } else {
        next()
    }
}

export default authenticateJWT;