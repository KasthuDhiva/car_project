const express = require("express");
const { addPlace, placeFilter, dateFilter } = require("../controller/placeController");
const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/",addPlace);
router.get("/filter-places",placeFilter);
router.get("/filter-dates",dateFilter);


module.exports = router;