import express, {Request, Response, NextFunction} from 'express';
const jwt = require('jsonwebtoken');
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();


// TODO: Test out this middleware once login endpoint is done and returns a JSON web token
const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(' ')[1];
        try {
            const {id} = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            if (id) {
                req.user = {id: Number(id)};
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