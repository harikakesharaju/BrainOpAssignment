const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load the environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = async () => {
  try {
    // Access the MONGODB_URI from process.env
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
