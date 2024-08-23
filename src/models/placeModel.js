const mongoose = require("mongoose");


const availabilitySchema = mongoose.Schema({
  date: { type: Date, required: true },
  available: { type: Number, default: 5 ,max:5,min:0} 
});

const placeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Place name should not be empty"],
    trim: true,
    unique: true,
  },
  location: {
    type: String,
    required: [true, "Location should not be empty"],
    trim: true,
  },
  availability: [availabilitySchema]
});

module.exports = mongoose.model("Place", placeSchema);
