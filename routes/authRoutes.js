const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const seq = require("sequelize");
const Op = seq.Op;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = require("../models");

router.post(
  "/register",
  [
    check("password")
      .isLength({ min: 4, max: 8 })
      .withMessage("Must be between 4 and 8 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { username, password } = req.body;
    username = username.toLowerCase();

    var user = await db.User.findOne({ where: { username: username } });
    if (user) {
      res.status(400).json("user with this username already exists");
    } else {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        //save hash as pw in db
        if (err) {
          res.json("password could not be hashed");
        } else {
          db.User.create({ username, password: hash });
          res.status(200).json({ message: "Successfully registered!" });
        }
      });
    }
  }
);

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  username = username.toLowerCase();
  var user = await db.User.findOne({ where: { username: username } });
  if (!user) {
    res.status(401).json({ message: "No user with thisusername!" });
  } else {
    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (!isMatch) {
        res.status(403).json("password is incorrect!");
      } else {
        jwt.sign(
          { id: user.id, username: user.username },
          "secretkey",
          { expiresIn: "300s" },
          (err, token) => {
            delete user.password;
            res.json({
              token,
              user,
            });
          }
        );
      }
    });
  }
});
module.exports = router;
