const { client } = require("./client");

const createBusiness = async ({ name, rating }) => {
  if (!name && !rating) {
    const error = Error("business name and rating required!");
    error.status = 401;
    throw error;
  }
  try {
    const SQL = `INSERT INTO businesses(name, rating) VALUES($1, $2) RETURNING *`;
    const response = await client.query(SQL, [name, rating]);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const fetchBusinesses = async () => {
  try {
    const SQL = `SELECT id, name, rating FROM businesses`;
    const response = await client.query(SQL);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createBusiness, fetchBusinesses };
