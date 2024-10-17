const express = require("express");
const router = express.Router();

const { fetchUsers, getUserById, setAdmin } = require("../db");

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
    const result = await getUserById(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const result = await setAdmin(req.body.admin, req.params.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
