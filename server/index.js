const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const { client } = require("./db");
client.connect();

app.use(express.json());
// app.use(express.static("dist"));
// app.get("/", (req, res, next) => {
//   res.sendFile(`${__dirname}/dist/index.html`);
// });

app.use(cors());

app.use("/api", require("./api"));

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .send({ error: err.message ? err.message : err });
});

app.listen(port, () => console.log(`listening on port ${port}`));
