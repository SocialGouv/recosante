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
        commune_code: z.string().optional(),
        commune_nom: z.string().optional(),
        commune_codesPostaux: z.string().optional(),
        push_notif_token: z.string().optional(),
      }).parse(req.body);
    } catch (e) {
      const error = new Error(`Invalid request in post user: ${e}`);
      error.status = 400;
      return next(error);
    }

    const { matomoId } = req.body;
    const updateObj = {};
    if (req.body.hasOwnProperty("commune_code")) {
      updateObj.commune_code = req.body.commune_code;
    }
    if (req.body.hasOwnProperty("commune_nom")) {
      updateObj.commune_nom = req.body.commune_nom;
    }
    if (req.body.hasOwnProperty("commune_codesPostaux")) {
      updateObj.commune_codesPostaux = req.body.commune_codesPostaux;
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
  })
);

export default router;
