import express, {Request, NextFunction} from 'express';
const jwt = require('jsonwebtoken');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export interface ReqWithUser extends Request {
    user: {
        id: number;
        email: string;
        dateCreated: Date;
        username: string;
        password?: string;
    }
}

// TODO: Test out this middleware once login endpoint is done and returns a JSON web token
const authenticateJWT = async (req: ReqWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = await prisma.user.findUniqueOrThrow({
                where: {
                    id: user.id
            }
        })

        delete req.user.password;

        } catch (e) {
            next(e);
        }
    }
}

export default authenticateJWT;