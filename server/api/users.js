const express = require("express");
const router = express.Router();
const { createUser } = require("../db");
const jwt = require("jsonwebtoken");

const { fetchUsers } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username) {
    next({ name: "UsernameRequiredErr", message: "Please provide username" });
    return;
  }
  if (!password) {
    next({ name: "PasswordRequiredErr", message: "Please provide password" });
    return;
  }
  try {
    const result = await createUser(req.body);
    if (result) {
      const token = jwt.sign({ id: result.id, username }, process.env.JWT, {
        expiresIn: "1w",
      });
      console.log(token);
      res.send({
        message: "Registration successful",
        token,
        user: { id: result.id, username: result.username },
      });
      return;
    } else {
      next({ name: "RegistrationErr", message: "error registering" });
      return;
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
