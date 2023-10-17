import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const zoopsRouter = express.Router();

// Get /api/zoops/:id
zoopsRouter.get("/:id", async (req, res, next) => {
  try {
    const zoopId = Number(req.params.id);
    const zoop = await prisma.zoop.findFirst({
      where: {
        id: zoopId,
      },
    });
    res.send({ zoop });
  } catch (e) {
    next(e);
  }
});

export default zoopsRouter;
