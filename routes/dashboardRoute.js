const router = require("express").Router();
const {
  dashboardController,
  summaryController,
} = require("../controllers/dashboardController");

router.get("/", dashboardController);
router.get("/summary", summaryController);

module.exports = router;
