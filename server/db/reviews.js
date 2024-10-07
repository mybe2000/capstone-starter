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

// const fetchReviewsByUserId = async (userId) => {
//   try {
//     const SQL = `SELECT reviews.id, reviews.userid, reviews.businessid, reviews.comments, reviews.rating, users.username FROM reviews INNER JOIN users ON reviews.userid = users.id WHERE reviews.userid=$1 `;
//     const response = await client.query(SQL, [userId]);
//     console.log(response);
//     return response.rows;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const fetchUserReviews = async (userId) => {
//   try {
//     const SQL = `SELECT businesses.id, reviews.id, reviews.userid, reviews.businessid, reviews.comments, reviews.rating FROM reviews JOIN businesses ON businesses.businessid = businesses.id AND userid=$1`;
//     const response = await client.query(SQL, [userId]);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

const fetchReviewsByBusinessId = async (businessId) => {
  try {
    const SQL = `SELECT * FROM reviews WHERE businessId=$1`;
    const response = await client.query(SQL, [businessId]);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (id) => {
  console.log(id);
  try {
    const SQL = `DELETE FROM reviews WHERE id=$1 RETURNING *`;
    const result = await client.query(SQL, [id]);

    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createReview,
  fetchReviews,
  fetchReviewsByUserId,
  fetchReviewsByBusinessId,
  deleteReview,
  // fetchUserReviews,
};
