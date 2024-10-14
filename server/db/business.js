const { client } = require("./client");
const uuid = require("uuid");

const createBusiness = async ({ businessname }) => {
  if (!businessname && !rating) {
    const error = Error("business name required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
    INSERT INTO businesses(id, businessname) VALUES($1, $2) RETURNING *`;
  const response = await client.query(SQL, [uuid.v4(), businessname]);
  return response.rows[0];
};

const fetchBusinesses = async () => {
  const SQL = `
    SELECT id, businessname FROM businesses`;
  const response = await client.query(SQL);
  return response.rows;
};

const getBusinessById = async (id) => {
  try {
    const SQL = `SELECT id, businessname FROM businesses WHERE id=$1`;
    const business = await client.query(SQL, [id]);

    return business.rows[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createBusiness, fetchBusinesses, getBusinessById };
