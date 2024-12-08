// Init Rest API
const express = require("express");
const axios = require("axios").default;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const uri = process.env["MONGO_URI"];
const { auth } = require("express-openid-connect");
require('dotenv').config()

const app = express();

const port = 3000;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env["AUTH0_SECRET"],
  baseURL: 'https://jubilant-yodel-5gv579q6q5g9fvrxq-3000.app.github.dev',
  clientID: process.env["AUTH0_CLIENTID"],
  issuerBaseURL: 'https://dev-1tui2vdlhhsdtl30.us.auth0.com'
};

// Import Util Functions
const {
authenticateToken,
getToken,
ensureNoToken,
} = require("./utils/authUtils");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.set("trust proxy", true); // Trust the first proxy
app.use(express.json()); // Parse JSON requests
app.use(express.static(__dirname + "/public")); // Serve static files
app.use(cookieParser()); // Parse cookies
app.use(express.json({ limit: "100mb" })); // Set JSON body limit to 100mb
app.use(express.urlencoded({ extended: true, limit: "100mb" })); // Parse URL-encoded bodies with limit


app.use("/", authRoutes);  

app.use(auth(config)); // Use auth middleware with config

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


app.use(express.json());

app.get('/' , (req, res) => {
    res.send("hello");
})



const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await mongoose.disconnect();
  }
}
run().catch(console.dir);


// Connect to the database and start the server
mongoose
  .connect(process.env["MONGO_URI"]) // Connect to MongoDB
  .then(() => {
    console.log("Connected to db");

    app.listen(process.env["PORT"], () => {
      console.log("Server started on port " + process.env["PORT"]); // Start server
    });
  })
  .catch((err) => {
    console.error("Error connecting to db:", err);
    return;
  });