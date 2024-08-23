const Service = require("../models/serviceModel");
const Place = require("../models/placeModel");

const addPlace = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorised to add a place" });
    }

    const { name, location } = req.body;

    if (!name || !location) {
      return res
        .status(400)
        .json({ message: "Name and location are required" });
    }

    const place = new Place({
      name,
      location,
    });

    await place.save();

    res.status(200).json({ message: "Place added successfully", place });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const placeFilter = async (req, res) => {
  try {
    const { name } = req.query;

    const query = {};
    if (name) {
      query.name = name;
    }

    const filteredPlaces = await Place.find(query);

    res.status(200).json(filteredPlaces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const dateFilter = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date query parameter is required" });
    }

    const targetDateISO = new Date(date).toISOString().split('T')[0];

    const filteredPlaces = await Place.find({
      availability: { $elemMatch: { date: new Date(targetDateISO) } }
    });

    res.status(200).json(filteredPlaces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { addPlace, placeFilter, dateFilter };
