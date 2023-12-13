import express from "express";
import { catchErrors } from "../middlewares/errors.js";
import prisma from "../prisma.js";
const router = express.Router();

router.get(
  "/",
  catchErrors(async (req, res) => {
    // test prisma db connection
    const conso = await prisma.consommation.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (conso) {
      return res.send({ ok: true, data: conso?.id });
    }
    return res.send({ ok: false });
  }),
);

export default router;
