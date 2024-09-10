const {
  getAllDailyMealCount,
  singleCreateDailyMealCount,
  searchDailyMealCount,
  getSingleDailyMealCount,
  singleUpdateDailyMealCount,
  singleDeleteDailyMealCount,
} = require("../controllers/DailyMealCountController");

const router = require("express").Router();

// daily meal count create and get
router.route("/").get(getAllDailyMealCount).post(singleCreateDailyMealCount);

// search daily meal count
router.get("/search", searchDailyMealCount);

// daily meal count by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleDailyMealCount)
  .put(singleUpdateDailyMealCount)
  .delete(singleDeleteDailyMealCount);

module.exports = router;
