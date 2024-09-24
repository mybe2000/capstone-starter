const express = require("express");
const businessesRouter = express.Router();
const { fetchBusinesses } = require("../db");

businessesRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (ex) {
    next(ex);
  }
});

module.exports = businessesRouter;
