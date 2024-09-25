const express = require("express");
const router = express.Router();

const { fetchReviews, fetchReviewsByUserId } = require("../db");

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    res.send(await fetchReviewsByUserId(userId));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
