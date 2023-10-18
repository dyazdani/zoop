import express from 'express';
const jwt = require('jsonwebtoken');

// TODO: Test out this middleware once login endpoint is done and returns a JSON web token
const authenticateJWT = async (req: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = user.id
        } catch (e) {
            next(e);
        }
    }
}

export default authenticateJWT;