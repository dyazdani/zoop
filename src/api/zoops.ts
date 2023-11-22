import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { prismaExclude } from "prisma-exclude";
import requireUser from "../utils/requireUser";

const prisma = new PrismaClient();
const exclude = prismaExclude(prisma);

const zoopsRouter = express.Router();

// GET /api/zoops
zoopsRouter.get("/", async (req, res, next): Promise<void> => {
  try {
    const zoops = await prisma.zoop.findMany({
      include: {
        faves: {
          include: {
            faver: {
              select: exclude("user", ["password"]),
            },
          },
        },
        author: {
          select: exclude("user", ["password"]),
        },
        receiver: {
          select: exclude("user", ["password"]),
        },
      },
    });
    res.send({ zoops });
  } catch (e) {
    next(e);
  }
});

// GET /api/zoops/:id
zoopsRouter.get("/:id", async (req, res, next) => {
  try {
    const zoopId = Number(req.params.id);
    const zoop = await prisma.zoop.findUniqueOrThrow({
      where: {
        id: zoopId,
      },
    });
    res.send({ zoop });
  } catch (e) {
    next(e);
  }
});

// POST /api/zoops
zoopsRouter.post("/", requireUser, async (req, res, next): Promise<void> => {
  if (req.user) {
    try {
      const { content, receiverId } = req.body;
      const authorId = req.user?.id;
      const zoop = await prisma.zoop.create({
        data: {
          content,
          authorId,
          receiverId,
        },
      });
      res.send({ zoop });
    } catch (e) {
      next(e);
    }
  }
});

// PUT /api/zoops/:id
zoopsRouter.put("/:id", requireUser, async (req, res, next) => {
  const userId = req.user?.id;
  const { id } = req.params;

  const zoop = await prisma.zoop.findUnique({
    where: { id: Number(id) },
  });

  if (!zoop) {
    res
      .status(404)
      .send({ name: "NotFound", message: "Zoop with ID not found" });
  } else if (zoop.authorId === userId) {
    try {
      const { content } = req.body;
      const zoop = await prisma.zoop.update({
        where: { id: Number(id) },
        data: { content },
      });
      res.send({ zoop });
    } catch (e) {
      next(e);
    }
  } else {
    res.status(403).send({ message: "Only author of zoop can update zoop" });
  }
});

// DELETE /api/zoops/:id
zoopsRouter.delete(`/:id`, requireUser, async (req, res, next) => {
  const userId = req.user && req.user.id;
  try {
    const { id } = req.params;
    const zoop = await prisma.zoop.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    if (userId === zoop.authorId || userId === zoop.receiverId) {
      const deletedZoop = await prisma.zoop.delete({
        where: {
          id: Number(id),
        },
      });
      res.send(deletedZoop);
    } else {
      res
        .status(403)
        .send({ message: "Only author or receiver of zoop may delete zoop" });
    }
  } catch (e) {
    next(e);
  }
});

export default zoopsRouter;
