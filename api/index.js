const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const databaseConnection = require("../config/dbConnection");
const membersRoute = require("../routes/memberRoutes");
const bazarListRoute = require("../routes/bazarListRoutes");
const bazarScheduleRoute = require("../routes/BazarScheduleRoutes");
const dailyMealCountRoute = require("../routes/DailyMealCountRoutes");
const othersCostRoute = require("../routes/OthersCostRoutes");
const paidAmountRoute = require("../routes/PaidAmountRoutes");
const dashboardRoute = require("../routes/dashboardRoute");
const userRoute = require("../routes/userRoutes");

const app = express();
app.use([
  morgan("dev"),
  express.json(),
  cors(),
  express.urlencoded({ extended: true }),
]);
// database connection
databaseConnection();

// ========== all routes/end point =============
app.use("/api/auth/user", userRoute);
app.use("/api/members", membersRoute);
app.use("/api/bazarLists", bazarListRoute);
app.use("/api/bazarSchedules", bazarScheduleRoute);
app.use("/api/dailyMealCounts", dailyMealCountRoute);
app.use("/api/othersCosts", othersCostRoute);
app.use("/api/paidAmounts", paidAmountRoute);
app.use("/api/dashboard", dashboardRoute);
// =========== all routes ======================

// error handling
app.use((req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  next(error);
});

//Global Url
app.use((error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).send(`<h1>${error.message}</h1>`);
  }

  res.status(500).send(`<h1>SomeThings went wrong</h1>`);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
