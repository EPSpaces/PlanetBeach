const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const VerificationCode = require("../schemas/VerificationCode.model");
const User = require("../schemas/User.model");
const jwt = require("jsonwebtoken");

const router = express.Router();
const {
  ensureNoToken,
  authenticateToken,
  getToken,
  comparePassword,
  comparePasswordHash,
  hashPassword,
  generateAccessToken,
  sendVerificationCode,
} = require("../utils/authUtils");

router.post("/callback", async (req, res) => {
    const user = jwt.verify(req.body.id_token, process.env["AUTH0_SECRET"], { algorithms: ['HS256'] })

    if (!user) {
        res.redirect("/login");
    }

    const { email } = user;

    let alreadyUser;

    try {
        alreadyUser = await User.findOne({ email });
    } catch (err) {
        res.status(500).send("An error occured")
        return;
    }

    if (alreadyUser) {
        alreadyUser = await User.findOne({ email });

        const accessToken = generateAccessToken({ email });

        res.cookie("authToken", accessToken, { httpOnly: True, maxAge: 3600000 });
        res.redirect("/");
    } else {
        let userCheck;

        try {
            userCheckIfExist = await User.findOne({
                email,
            });
        } catch (err) {
            console.error("Error finding user with email to check if email exists: " + err);
            res.redirect("/signup?err=Internal server error, please try again");
            return;
        }

        if (userCheckIfExist) {
            res.redirect("/signup?err=Email already exists");
            return;
        }

        const newUser = new User({
            firstName: user.nickname,
            lastName: user.nickname,
            email: user.email,
            cell: "none",
            power: 0,
            tokens: 0
        });

        newUser.save().catch((err) => {
            console.error("Error creating user: " + err);
            res.redirect("/signup?err=Internal server error, please try again");
            return;
        })
    }
})

module.exports = router;