const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Token : ", token);
    // console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ Error: "Unauthorized User" });
        }
        const user = await User.findById(decoded.id);
        console.log(user);
        if (!user) {
          return res.status(401).json({ Error: "User not found" });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({ Error: "Token not provided" });
    }
  } catch (err) {
    console.error("Internal Server Error in authMiddleware:", err);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
