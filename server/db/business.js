const { client } = require("./client");

const createBusiness = async ({ name }) => {
  if (!name) {
    const error = Error("username and password required!");
    error.status = 401;
    throw error;
  }
  try {
    const SQL = `INSERT INTO businesses(name) VALUES($1) RETURNING *`;
    const response = await client.query(SQL, [name]);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createBusiness };
