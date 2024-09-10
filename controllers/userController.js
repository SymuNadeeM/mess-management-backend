const { signInToken } = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// get all admin
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      data: users,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// single create user
const singleCreateUser = async (req, res) => {
  try {
    let user = new User({ ...req.body });
    await user.save();

    res.status(201).json({
      message: "User created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// user sing up
const userSignUp = async (req, res) => {
  try {
    const userFind = await User.findOne({ email: req.body.email });

    if (userFind) {
      res.status(500).json({
        message: "Already use this mail!",
      });
    } else {
      const userInfo = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password),
      };

      let user = new User(userInfo);
      await user.save();

      res.status(201).json({
        message: "User sing up Successfully",
      });
    }
  } catch (error) {
    console.log("error", error.message, error);
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// user sing in
const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = signInToken(user);

      res.status(201).json({
        token: `Bearer ${token}`,
        message: "User sign in Successfully",
      });
    } else {
      res.status(401).send({
        message: `Invalid Email or Password!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// get single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      data: user,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// single update user
const singleUpdateUser = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        blood_group: req.body.blood_group,
      }
    );

    res.status(201).json({
      message: "User updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

// single delete user
const singleDeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          message: error.message,
        },
      },
    });
  }
};

module.exports = {
  getAllUser,
  userSignIn,
  userSignUp,
  getSingleUser,
  singleDeleteUser,
  singleCreateUser,
  singleUpdateUser,
};
