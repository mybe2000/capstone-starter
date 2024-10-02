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
      password VARCHAR(255) NOT NULL
    );
  
  CREATE TABLE businesses(
  id UUID PRIMARY KEY,
  businessname VARCHAR(64) NOT NULL
  );

  CREATE TABLE reviews(
  id UUID PRIMARY KEY,
  userid UUID NOT NULL,
  businessid UUID,
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

  const [] = await Promise.all([
    createBusiness({ businessname: "Tailor Tom" }),
    createBusiness({ businessname: "clothingStore" }),
    createBusiness({ businessname: "carshop" }),
  ]);
  const businesses = await fetchBusinesses();
  console.log("fetch businesses", businesses);

  const [] = await Promise.all([
    createReview({
      userId: users[0].id,
      businessId: businesses[0].id,
      comments: "Hemmed my pants perfectly",
      rating: "5",
    }),
    createReview({
      userId: users[1].id,
      businessId: businesses[1].id,
      // name: "clothingStore",
      comments: "Have a good selection",
      rating: "4",
    }),
    createReview({
      userId: users[1].id,
      businessId: businesses[2].id,

      comments: "very expensive",
      rating: "3",
    }),
  ]);
  const reviews = await fetchReviews();
  console.log(reviews);

  client.end();
};

init();
