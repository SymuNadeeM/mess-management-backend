const {
  getAllBazarSchedule,
  singleCreateBazarSchedule,
  searchBazarSchedule,
  getSingleBazarSchedule,
  singleUpdateBazarSchedule,
  singleDeleteBazarSchedule,
} = require("../controllers/bazarScheduleController");

const router = require("express").Router();

// bazar schedule create and get
router.route("/").get(getAllBazarSchedule).post(singleCreateBazarSchedule);

// search bazar schedule
router.get("/search", searchBazarSchedule);

// bazar schedule by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleBazarSchedule)
  .put(singleUpdateBazarSchedule)
  .delete(singleDeleteBazarSchedule);

module.exports = router;
