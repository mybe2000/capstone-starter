const { client } = require("./client");
const uuid = require("uuid");

const createReview = async ({ userId, name, comments, rating }) => {
  if (!userId || !name || !rating) {
    const error = Error("user id, name and rating required!");
    error.status = 401;
    throw error;
  }
  try {
    const SQL = `INSERT INTO reviews(id, userId, name, comments, rating) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const response = await client.query(SQL, [
      uuid.v4(),
      userId,
      name,
      comments,
      rating,
    ]);
    return response.rows[0];
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

module.exports = { createReview, fetchReviews, fetchReviewsByUserId };
