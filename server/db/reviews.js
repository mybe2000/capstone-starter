const { client } = require("./client");
const uuid = require("uuid");

const createReview = async ({ userId, businessId, comments, rating }) => {
  if (!userId || !rating) {
    const error = Error("user id, business and rating required!");
    error.status = 401;
    throw error;
  }
  try {
    const SQL = `INSERT INTO reviews(id, userId, businessId, comments, rating) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const review = await client.query(SQL, [
      uuid.v4(),
      userId,
      businessId,
      comments,
      rating,
    ]);
    return review.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const fetchReviews = async () => {
  try {
    const SQL = `SELECT * FROM reviews`;
    const response = await client.query(SQL);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const fetchReviewsByUserId = async (userId) => {
  try {
    const SQL = `SELECT * FROM reviews WHERE userId=$1`;
    const response = await client.query(SQL, [userId]);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const fetchReviewsByBusinessId = async (businessId) => {
  try {
    const SQL = `SELECT * FROM reviews WHERE businessId=$1`;
    const response = await client.query(SQL, [businessId]);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createReview,
  fetchReviews,
  fetchReviewsByUserId,
  fetchReviewsByBusinessId,
};
