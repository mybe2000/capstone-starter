const pg = require("pg");
// const client = new pg.Client(
//   process.env.DATABASE_URL
//   // || "postgres://localhost/fsa_app_db"
// );
const client = new pg.Client({
  connectionString:
    process.env.DATABASE_URL || "postgres://localhost:5432/fsa_app_db",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

module.exports = { client };
