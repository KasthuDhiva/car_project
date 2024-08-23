const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service", 
    required: true
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place", 
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "success", "rejected"],
    default: "pending"
  }
});

bookingSchema.pre("save", async function(next) {
  try {
    const bookingDate = new Date(this.date).toISOString().split('T')[0]; 
    const place = await mongoose.model("Place").findById(this.place);
    console.log("This is place"+place);

    if (!place) {
      throw new Error("Place not found");
    }

    let availabilityRecord = place.availability.find(record => record.date.toISOString().split('T')[0] === bookingDate);

    if (!availabilityRecord) {
      availabilityRecord = { date: this.date, available: 5 }; 
      place.availability.push(availabilityRecord);
    }

    if (availabilityRecord.available <= 0) {
      throw new Error("No availability for the selected date");
    }

    availabilityRecord.available--;
    await place.save();
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Booking", bookingSchema);

