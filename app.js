const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const DBURL = process.env.DBURL;
mongoose.set("strictQuery", true);

// modileware
app.use(express.json());
app.use(router);
app.use(cors());

// connect mongoose into mongodb
mongoose
  .connect(DBURL)
  .then((res) => console.log("Successfully connect mongoose into mongoDB"))
  .catch((err) => console.log(`Connection error: ${err}`));

// server running
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/api`)
);
