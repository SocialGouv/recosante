const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { commune, email, push_notif_token } = req.body;
    const updateObj = {
      email,
      commune_code: commune?.code,
      commune_nom: commune?.nom,
      push_notif_token,
    };
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

module.exports = router;
