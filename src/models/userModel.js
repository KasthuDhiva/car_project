const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username should not be empty"],
      minLength: [6, "Username must be above 6 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email field should not be empty"],
      unique: [true, "Email should be unique"],
    },
    password: {
      type: String,
      required: [true, "Password should not be empty"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
