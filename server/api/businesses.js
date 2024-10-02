const express = require("express");
const router = express.Router();
const { fetchBusinesses, getBusinessById } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getBusinessById(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
