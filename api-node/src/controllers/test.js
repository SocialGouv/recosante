const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

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
  })
);

module.exports = router;
