const express = require("express");
const router = express.Router();

const { fetchUsers, getUserById } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("userid", id);
    const result = await getUserById(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
