import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.send("index.html");
  } catch (error) {
    next(error);
  }
});

import apiRouter from "./api";
app.use("/api", apiRouter);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
