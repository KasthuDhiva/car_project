const Service = require("../models/serviceModel");
const Place = require("../models/placeModel");
const Booking = require("../models/bookingModel");

const getAllServices = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const service = await Service.find();
    if (!service) throw new Error("Error fetching blogs");
    res.status(200).json(service);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error" + err);
  }
};

const addService = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorised to add service" });
    }

    const { serviceName, servicePrice } = req.body;
    console.log("Request Body:", req.body);

    if (!serviceName || !servicePrice) {
      return res
        .status(400)
        .json({
          message: "serviceName, and servicePrice are required",
        });
    }

    let service = await Service.findOne({
      name: serviceName,
      price: servicePrice,
    });

    if (!service) {
      service = new Service({ name: serviceName, price: servicePrice });
      await service.save();
    }

    res.status(200).json({ message: "Service added successfully", service });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const updateService = async (req, res) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Middleware is not passed here");
    if (user.role !== "admin")
      throw new Error("You are not authorised to update services");

    const { name, price } = req.body;
    const id = req.params.id;
    if (!id) throw new Error("Params is not passed here");
    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        price,
      },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json(updatedService);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" + err });
  }
};

const deleteService = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin")
      throw new Error("You are not authorised to delete services");

    const id = req.params.id;

    const serviceToDelete = await Service.findById(id);
    if (!serviceToDelete) {
      throw new Error("Service not found or unauthorized to delete");
    }

    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      throw new Error("No service found to delete");
    }

    res.status(200).json(deletedService);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error: " + err });
  }
};

const updateStatus = async (req, res) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Middleware is not passed here");
    if (user.role !== "admin")
      throw new Error("You are not authorised to update services");

    const { status } = req.body;
    const id = req.params.id;

    if (!id) throw new Error("Params is not passed here");

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      {
        status
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error: " + err });
  }
};


module.exports = { addService, updateService, deleteService, getAllServices ,updateStatus};
