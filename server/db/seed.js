require("dotenv").config();
const { client } = require("./client");

const {
  createUser,
  fetchUsers,
  createBusiness,
  fetchBusinesses,
  createReview,
  fetchReviews,
} = require("./index.js");

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS businesses CASCADE;
    DROP TABLE IF EXISTS reviews;

  CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      reviews VARCHAR(1022)
    );
  
  CREATE TABLE businesses(
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  rating INTEGER CHECK(rating >=1 AND rating <=5)
  );

  CREATE TABLE reviews(
  id UUID PRIMARY KEY,
  userid UUID NOT NULL,
  name VARCHAR(64) NOT NULL,
  comments VARCHAR(1022),
  rating INTEGER CHECK(rating >=1 AND rating <=5)
  )
  `;
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
  const users = await fetchUsers();
  console.log("FETCH USER :", users);

  const [clothingStore, carshop] = await Promise.all([
    createBusiness({ name: "clothingStore", rating: "4" }),
    createBusiness({ name: "carshop", rating: "3" }),
  ]);
  console.log("fetch business", await fetchBusinesses());

  const [tailorTom, papaPizza] = await Promise.all([
    createReview({
      userId: users[0].id,
      name: "tailorTom",
      comments: "Hemmed my pants perfectly",
      rating: "5",
    }),
    createReview({
      userId: users[1].id,
      name: "papaPizza",
      comments: "not enough cheese on my pie",
      rating: "3",
    }),
  ]);
  console.log(await fetchReviews());

  client.end();
};

init();
