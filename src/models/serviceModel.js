const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service name should not be empty"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Service price should not be empty"],
  }
});

module.exports = mongoose.model("Service", serviceSchema);
