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
      admin BOOLEAN DEFAULT false
    );
  
  CREATE TABLE businesses(
  id UUID PRIMARY KEY,
  businessname VARCHAR(64) NOT NULL,
  imageUrl VARCHAR(755)
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
    createUser({ username: "moe", password: "m_pw", admin: false }),
    createUser({ username: "lucy", password: "l_pw", admin: false }),
    createUser({ username: "ethyl", password: "e_pw", admin: false }),
    createUser({ username: "curly", password: "c_pw", admin: false }),
  ]);
  const users = await fetchUsers();
  console.log("FETCH USER :", users);

  const [] = await Promise.all([
    createBusiness({
      businessname: "Angelo's Pizza",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8P7xTejhoWd1JAiMBgWSC7_SnJ87UszQm0g&s",
    }),
    createBusiness({
      businessname: "SW Shoestore",
      imageUrl:
        "https://arktura.com/wp-content/uploads/2020/05/Arktura-Vapor-Trail-Feature-Shoe-Store-Las-VegasNV_Web_1-1-scaled.jpg",
    }),
    createBusiness({
      businessname: "Craig's Coffee",
      imageUrl:
        "https://verileet.com/wp-content/uploads/2020/12/Coffee-Shop-main-Image-1236x800.jpg",
    }),
  ]);
  const businesses = await fetchBusinesses();
  console.log("fetch businesses", businesses);

  const [] = await Promise.all([
    createReview({
      userId: users[0].id,
      businessId: businesses[0].id,
      comments: "Fast delivery and delicious pizza",
      rating: "5",
    }),
    createReview({
      userId: users[1].id,
      businessId: businesses[0].id,
      comments: "good",
      rating: "4",
    }),
    createReview({
      userId: users[1].id,
      businessId: businesses[1].id,
      comments: "very expensive",
      rating: "4",
    }),
    createReview({
      userId: users[1].id,
      businessId: businesses[2].id,

      comments: "They have a good selection of coffee",
      rating: "3",
    }),
  ]);
  const reviews = await fetchReviews();
  console.log(reviews);

  client.end();
};

init();
