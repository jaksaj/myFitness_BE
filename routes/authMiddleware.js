const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const token = authorizationHeader.slice(7);

    try {
      const decoded = jwt.verify(token, "your-secret-key");
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized - Missing or invalid token" });
  }
};

module.exports = authenticateToken;
