const express = require("express");
const router = express.Router();
const { fetchBusinesses, getBusinessById, createBusiness } = require("../db");

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
    console.log("id", id);
    const result = await getBusinessById(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await createBusiness(req.body);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
