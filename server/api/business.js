const express = require("express");
const businessRouter = express.Router();
const { fetchBusinesses } = require("../db");

businessRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (error) {
    next(error);
  }
});

module.exports = businessRouter;
