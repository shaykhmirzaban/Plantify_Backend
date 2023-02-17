const mongoose = require("mongoose");

const curdSchema = mongoose.Schema({
  name: String,
  description: String,
  title: String,
  size: String,
  color_code: String,
  price: String,
  category: String,
  image: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const curdModel = mongoose.model("data", curdSchema);

module.exports = curdModel;
