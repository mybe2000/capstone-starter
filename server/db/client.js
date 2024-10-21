const pg = require("pg");
// const client = new pg.Client(
//   process.env.DATABASE_URL || "postgres://localhost:5432/fsa_app_db"
// );
// const client = new pg.Client({
//   connectionString:
//     process.env.DATABASE_URL || "postgres://localhost:5432/fsa_app_db",
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : false,
// });
const client = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
  user: process.env.USER,
});

module.exports = { client };
