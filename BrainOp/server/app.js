// server/app.js
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
  });
  app.use(limiter);

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/posts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
