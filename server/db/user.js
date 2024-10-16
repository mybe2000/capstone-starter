const { client } = require("./client");
const uuid = require("uuid");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;
// || "shhh";
if (JWT === "shhh") {
  console.log("If deployed, set process.env.JWT to something other than shhh");
}

const createUser = async ({ username, password, admin }) => {
  if (!username && !password) {
    const error = Error("username and password required!");
    error.status = 401;
    throw error;
  }
  const SQL = `
    INSERT INTO users(id, username, password, admin) VALUES($1, $2, $3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    await bcrypt.hash(password, 5),
    admin,
  ]);
  return response.rows[0];
};

const getUserById = async (id) => {
  try {
    const SQL = `SELECT id, username, admin FROM users WHERE id=$1`;
    const user = await client.query(SQL, [id]);
    return user.rows[0];
  } catch (error) {
    console.log(error);
  }
};

const findUserWithToken = async (token) => {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, username, admin FROM users WHERE id=$1;
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

const fetchUsers = async () => {
  const SQL = `
    SELECT id, username, admin FROM users;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT id, username, password, admin FROM users WHERE username=$1;
  `;
  const response = await client.query(SQL, [username]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id }, JWT);
  return { token };
};

const setAdmin = async (admin, id) => {
  try {
    const SQL = `UPDATE users SET admin = $1 WHERE id = $2 RETURNING *`;
    const result = await client.query(SQL, [admin, id]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getUserById,
  findUserWithToken,
  fetchUsers,
  authenticate,
  setAdmin,
};
