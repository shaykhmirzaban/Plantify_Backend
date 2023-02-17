const mongoose = require("mongoose");

const authenticationSchema = mongoose.Schema({
  email: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const authenticationModel = mongoose.model("user", authenticationSchema);

module.exports = authenticationModel;
