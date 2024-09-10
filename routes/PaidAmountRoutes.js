const {
  getAllPaidAmount,
  singleCreatePaidAmount,
  searchPaidAmount,
  getSinglePaidAmount,
  singleUpdatePaidAmount,
  singleDeletePaidAmount,
} = require("../controllers/PaidAmountController");

const router = require("express").Router();

// paid amount create and get
router.route("/").get(getAllPaidAmount).post(singleCreatePaidAmount);

// search paid amount
router.get("/search", searchPaidAmount);

// paid amount by id single get, update, and delete
router
  .route("/:id")
  .get(getSinglePaidAmount)
  .put(singleUpdatePaidAmount)
  .delete(singleDeletePaidAmount);

module.exports = router;
