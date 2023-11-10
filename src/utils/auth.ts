import express, {Request, Response, NextFunction} from 'express';
const jwt = require('jsonwebtoken');
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();


const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(' ')[1];
        try {
            const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            

            if (user) {
                // TODO: This assignment was changed from {id: Number(id)} for user bc TS wanted all 
                // properties defined on User type. Is this OK?
                req.user = user;
            } else {
                req.user = null;
            }

            next()

        } catch (e) {
            next(e);
        } 
    } else {
        next()
    }
}

export default authenticateJWT;