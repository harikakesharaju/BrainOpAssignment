// server/routes/posts.js
const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/posts", authMiddleware, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  try {
    const posts = await Post.find()
      .populate("user", ["name"])
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const hasMore = posts.length === limit;
    res.json({ posts, hasMore });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
