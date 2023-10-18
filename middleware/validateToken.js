const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.session.token;

  // Check if a token exists in the session
  if (!token) {
    return res.status(401).send("Unauthorized. Please log in.");
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token.");
    }

    // If the token is valid, set the decoded user information in req.user
    req.user = decoded.admin;
    next();
  });
};

module.exports = validateToken;
