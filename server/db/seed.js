const { client } = require("./client");

const { createUser, fetchUsers } = require("./index.js");

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS businesses;

  CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  
  CREATE TABLE businesses(
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  rating INTEGER CHECK(rating >=1 AND rating <=5)
  )`;
  await client.query(SQL);
};

const init = async () => {
  await client.connect();
  console.log("connected to database");

  await createTables();
  console.log("tables created");

  const [moe, lucy, ethyl, curly] = await Promise.all([
    createUser({ username: "moe", password: "m_pw" }),
    createUser({ username: "lucy", password: "l_pw" }),
    createUser({ username: "ethyl", password: "e_pw" }),
    createUser({ username: "curly", password: "c_pw" }),
  ]);

  console.log(await fetchUsers());
  client.end();
};

init();
