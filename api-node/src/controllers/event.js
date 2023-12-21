import express from "express";
import { catchErrors } from "../middlewares/errors.js";
const router = express.Router();

router.post(
  "/",
  catchErrors(async (req, res) => {
    // const { body } = req;

    return res.status(200).send({ ok: true });
  }),
);

export default router;
