const {
  getAllOthersCost,
  singleCreateOthersCost,
  searchOthersCost,
  getSingleOthersCost,
  singleUpdateOthersCost,
  singleDeleteOthersCost,
} = require("../controllers/othersCostController");

const router = require("express").Router();

// others cost create and get
router.route("/").get(getAllOthersCost).post(singleCreateOthersCost);

// search others cost
router.get("/search", searchOthersCost);

// others cost by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleOthersCost)
  .put(singleUpdateOthersCost)
  .delete(singleDeleteOthersCost);

module.exports = router;
