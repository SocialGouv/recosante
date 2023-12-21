import express from "express";
import { z } from "zod";
import { catchErrors } from "../middlewares/errors.js";
import prisma from "../prisma.js";
const router = express.Router();

router.post(
  "/",
  catchErrors(async (req, res) => {
    try {
      z.object({
        matomoId: z.string(),
        municipality_code: z.string().optional(),
        municipality_nom: z.string().optional(),
        municipality_zip_code: z.string().optional(),
        push_notif_token: z.string().optional(),
      }).parse(req.body);
    } catch (e) {
      const error = new Error(`Invalid request in post user: ${e}`);
      error.status = 400;
      return next(error);
    }

    const { matomoId } = req.body;
    const updateObj = {};
    if (req.body.hasOwnProperty("municipality_code")) {
      updateObj.municipality_code = req.body.municipality_code;
    }
    if (req.body.hasOwnProperty("municipality_nom")) {
      updateObj.municipality_nom = req.body.municipality_nom;
    }
    if (req.body.hasOwnProperty("municipality_zip_code")) {
      updateObj.municipality_zip_code = req.body.municipality_zip_code;
    }
    if (req.body.hasOwnProperty("push_notif_token")) {
      updateObj.push_notif_token = req.body.push_notif_token;
    }

    console.log("updateObj", updateObj);
    await prisma.user.upsert({
      where: { email },
      update: updateObj,
      create: {
        ...updateObj,
      },
    });

    return res.status(200).send({ ok: true });
  }),
);

export default router;
