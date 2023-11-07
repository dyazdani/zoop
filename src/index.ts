import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";
require('dotenv').config();
import authenticateJWT from "./utils/auth";


const prisma = new PrismaClient();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(authenticateJWT);


import apiRouter from "./api";
app.use("/api", apiRouter);

app.get("*", (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  } catch (error) {
    next(error);
  }
});

// app.get('*', (req,res) =>{
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.use((req, res): void => {
  res.status(404)
    .send({ message: "Invalid Route"})
})

app.use((error: Error, req: Request, res: Response, next: NextFunction):void => {
  res.status(500)
    .send({ name: error.name, message: error.message })
})


const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
