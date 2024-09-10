const {
  getAllBazarList,
  singleCreateBazarList,
  searchBazarList,
  getSingleBazarList,
  singleUpdateBazarList,
  singleDeleteBazarList,
} = require("../controllers/bazarListController");

const router = require("express").Router();

// bazar list create and get
router.route("/").get(getAllBazarList).post(singleCreateBazarList);

// search bazar list
router.get("/search", searchBazarList);

// bazar list by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleBazarList)
  .put(singleUpdateBazarList)
  .delete(singleDeleteBazarList);

module.exports = router;
