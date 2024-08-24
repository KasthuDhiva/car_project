const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const ConnectDB = require("./src/db/database");
const authRouter = require("./src/router/auth");
const placeRouter = require("./src/router/placeRouter");
const addServiceRouter = require("./src/router/addServiceRouter");
const bookingRouter = require("./src/router/bookingRouter");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/place", placeRouter);
app.use("/api/v1/addService", addServiceRouter);
app.use("/api/v1/booking", bookingRouter);

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hello' });
});

ConnectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
