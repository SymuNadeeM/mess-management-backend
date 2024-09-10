const router = require("express").Router();

const {
  getAllUser,
  userSignIn,
  userSignUp,
  getSingleUser,
  singleDeleteUser,
  singleCreateUser,
  singleUpdateUser,
} = require("../controllers/userController");

const { isAuth } = require("../middleware/auth");

// User create and get
router.route("/").get(getAllUser).post(isAuth, singleCreateUser);

// User by id single get, update, and delete
router.route("/:id").get(isAuth, getSingleUser).put(isAuth, singleUpdateUser).delete(isAuth, singleDeleteUser);

// User sing in
router.post("/signIn", userSignIn);

// User sing up
router.post("/signUp", userSignUp);

module.exports = router;
