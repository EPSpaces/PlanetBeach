//Run Api stuff
const express = require("express");
const mongoose = require("mongoose");

//User schema
const User = require("../models/User.model.js");
const objectId = require("mongodb").ObjectID;
const { authenticateToken, getToken } = require("../utils/authUtils");

const router = express.Router();

//Get user info
router.get("/user", getToken, authenticateToken, (req, res) => {
  let userInfo = require("../database/points.json");
  res.json(points);
});