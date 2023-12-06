const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { body } = req;

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
