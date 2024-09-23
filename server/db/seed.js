require("dotenv").config();
const { client } = require("./client");

const { createUser, fetchUsers, createBusiness } = require("./index.js");

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
  name VARCHAR(64) NOT NULL
  );`;
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

  const [clothingStore, carshop] = await Promise.all([
    createBusiness({ name: "clothingStore" }),
    createBusiness({ name: "carshop" }),
  ]);

  console.log("FETCH USER :", await fetchUsers());
  client.end();
};

init();
