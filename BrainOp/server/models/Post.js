// server/models/Post.js
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
