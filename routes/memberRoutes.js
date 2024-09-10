const {
  getAllMember,
  singleCreateMember,
  getSingleMember,
  singleUpdateMember,
  singleDeleteMember,
  searchMember,
} = require("../controllers/memberController");
const router = require("express").Router();

// member create and get
router.route("/").get(getAllMember).post(singleCreateMember);

// search member {name, email, phone, joiningDate}
router.get("/search", searchMember);

// member by id single get, update, and delete
router
  .route("/:id")
  .get(getSingleMember)
  .put(singleUpdateMember)
  .delete(singleDeleteMember);

module.exports = router;
