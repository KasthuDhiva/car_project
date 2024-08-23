const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controller/authController");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ Message: "Hello World" });
});

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/logout", logoutController);

module.exports = router;
