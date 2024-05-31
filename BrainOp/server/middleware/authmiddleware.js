const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Check if Authorization header exists
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Extract token from Authorization header
  const token = authHeader.replace("Bearer ", "");

  try {
    // Verify token and decode user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    // Handle token verification errors
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
