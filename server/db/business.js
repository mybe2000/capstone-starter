const { client } = require("./client");
const uuid = require("uuid");

const createBusiness = async ({ businessname, imageUrl }) => {
  if (!businessname) {
    const error = Error("business name required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
    INSERT INTO businesses(id, businessname, imageUrl) VALUES($1, $2, $3) RETURNING *`;
  const response = await client.query(SQL, [uuid.v4(), businessname, imageUrl]);
  return response.rows[0];
};

const fetchBusinesses = async () => {
  const SQL = `
    SELECT id, businessname, imageUrl FROM businesses`;
  const response = await client.query(SQL);
  return response.rows;
};

const getBusinessById = async (id) => {
  try {
    const SQL = `SELECT id, businessname, imageUrl FROM businesses WHERE id=$1`;
    const business = await client.query(SQL, [id]);
    return business.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const deleteBusiness = async (id) => {
  try {
    const SQL = `DELETE FROM businesses WHERE id=$1 RETURNING *`;
    const response = await client.query(SQL, [id]);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createBusiness,
  fetchBusinesses,
  getBusinessById,
  deleteBusiness,
};
