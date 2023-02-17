const mongoose = require("mongoose");

const userOrderSchema = mongoose.Schema({
  user_data: [],
  user_info: {},
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const userOrderModel = mongoose.model("user_order", userOrderSchema);

module.exports = userOrderModel;
