const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createBooking, bookingStatus, getAllBookings } = require("../controller/bookingController");

router.use(authMiddleware);

router.post("/", createBooking);

router.get("/getStatus/:id", bookingStatus);

router.get("/getBooking", getAllBookings )


module.exports = router;