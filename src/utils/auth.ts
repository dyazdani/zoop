import express from 'express';
const jwt = require('jsonwebtoken');

const authenticateJWT = (req: any, res: any, next: () => void) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            .then( () => {
                next();
            })

        } catch (e: any) {
            throw new Error(e);
        }
    }
}

export default authenticateJWT;