const Booking = require("../models/bookingModel");
const Service = require("../models/serviceModel");
const Place = require("../models/placeModel");

const createBooking = async (req, res) => {
  try {
    const user = req.user;
    const { service, places, date } = req.body;

    const serviceID = await Service.findOne({ name: service });
    const placeID = await Place.findOne({ name: places });

    if (!serviceID || !placeID) {
      return res.status(404).json({ error: "Service or Place not found" });
    }

    const existingBooking = await Booking.findOne({
      user: user.id,
      service: serviceID.id,
      place: placeID.id,
      date,
    });

    if (existingBooking) {
      return res.status(409).json({
        error:
          "Booking already exists for the same user, service, place, and date",
      });
    }

    const bookingDate = new Date(date).toISOString().split("T")[0];

    const place = await Place.findById(placeID.id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    let availabilityRecord = place.availability.find(
      (record) => record.date.toISOString().split("T")[0] === bookingDate
    );

    if (!availabilityRecord) {
      availabilityRecord = { date: new Date(bookingDate), available: 5 };
      place.availability.push(availabilityRecord);
    }

    if (availabilityRecord.available <= 0) {
      return res
        .status(409)
        .json({ error: "No availability for the selected date" });
    }

    availabilityRecord.available--;
    await place.save();

    const booking = new Booking({
      user: user.id,
      service: serviceID.id,
      place: placeID.id,
      date,
      status: "pending",
    });

    await booking.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const bookingStatus = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;

    const statusOfBooking = await Booking.findOne({ _id: id });

    if (!statusOfBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(statusOfBooking.status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Middleware is not passed here");
    if (user.role !== "admin")
      throw new Error("You are not authorised to view bookings");

    const bookings = await Booking.find();

    res.status(200).json(bookings);
  } catch (err) {
    console.log(err); 
    res.status(500).json({ error: "Internal Server error" + err });
  }
}

module.exports = { createBooking, bookingStatus , getAllBookings };
