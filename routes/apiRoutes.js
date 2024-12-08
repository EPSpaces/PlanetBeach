//Run Api stuff
const express = require("express");
const mongoose = require("mongoose");

//User schema
const User = require("../schemas/User.model.js");
const objectId = require("mongodb").ObjectID;
const { authenticateToken, getToken } = require("../utils/authUtils");

const router = express.Router();

//Get user data
router.get("/users", getToken, authenticateToken, async (req, res) => {
  if (req.email != req.body.email) {
     res.status(401).json({ error: "Unauthorized" });
     return;
  }
  const user = await User.find({ email: req.query.email });
  console.log(user);
  res.json(user);
});

//Get sum of all user trash
router.get("/trash", getToken, authenticateToken, async (req, res) => {
  // Get all users
  const users = await User.find({});
  // For each user get the total power and sum
  const leaderboard = users.map((user) => {
    return {
      email: user.email,
      power: user.power,
      trash: user.trash,
      tokens: user.tokens,
    };
  });

  // Sort the leaderboard by power
  leaderboard.sort((a, b) => b.power - a.power);

  // Return the leaderboard
  res.json(leaderboard);
});

//Update user data
router.put("/users", getToken, authenticateToken, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  user.email = req.body.email;
  user.cell = req.body.cell;
  user.power = req.body.power;
  user.tokens = req.body.tokens;
  user.trash = req.body.trash;
  user.save();
  res.json(user);
});

router.get("/world", async (req, res) => {
  // Get all users
  const users = await User.find({});
  // For each user get the total power and sum
  const leaderboard = users.map((user) => {
    return {
      email: user.email,
      power: user.power,
      trash: user.trash,
      tokens: user.tokens,
    };
  });

  // Sort the leaderboard by power
  leaderboard.sort((a, b) => b.power - a.power);

  // Return the leaderboard
  res.json(leaderboard);
})

module.exports = router;