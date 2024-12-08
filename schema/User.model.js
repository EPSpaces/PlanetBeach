const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  cell: { type: String, default: "none" },
  power: { type: Number, default: 0 },
  tokens: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);