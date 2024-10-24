const express = require("express");
const router = express.Router();

const {
  fetchReviews,
  fetchReviewsByUserId,
  fetchReviewsByBusinessId,
  createReview,
  deleteReview,
  updateReview,
} = require("../db");

router.get("/", async (req, res) => {
  try {
    res.send(await fetchReviews());
  } catch (error) {
    res.send(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    res.send(await fetchReviewsByUserId(userId));
  } catch (ex) {
    next(ex);
  }
});

router.get("/:businessId", async (req, res, next) => {
  try {
    const { businessId } = req.params;
    res.send(await fetchReviewsByBusinessId(businessId));
  } catch (ex) {
    next(ex);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId, businessId, comments, rating } = req.body;
    res.send(await createReview({ userId, businessId, comments, rating }));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await deleteReview(req.params.id);

    res.send({ message: "Review deleted successfully", id: result });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    const result = await updateReview(
      req.body.comments,
      req.body.rating,
      req.params.id
    );

    res.send({ message: "Review updated successfully", id: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
