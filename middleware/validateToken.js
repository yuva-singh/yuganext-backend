const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (!authHeader && !authHeader.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Authorization header is missing or malformed");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Token is missing!");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("User is not authorized");
  }
});

module.exports = validateToken;
