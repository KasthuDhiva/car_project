const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("This email already exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const savedUser = newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
};

const loginController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not found");
    const matchedData = await bcrypt.compareSync(password, user.password);
    if (!matchedData) throw new Error("UnAuthorised User");
    const { password: _, ...data } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("token", token).status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const logoutController = async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: true, secure: true })
      .status(200)
      .json({ Message: "Logged Out" });
  } catch (err) {
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

module.exports = { registerController, loginController, logoutController };
