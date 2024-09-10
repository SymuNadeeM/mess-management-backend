const Member = require("../models/Member");

// get all member
const getAllMember = async (req, res) => {
  try {
    const member = await Member.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      data: member,
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
// create member
const singleCreateMember = async (req, res) => {
  try {
    let member = new Member({ ...req.body });
    await member.save();

    res.status(201).json({
      message: "Member created Successfully",
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
// search member
const searchMember = async (req, res) => {
  try {
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
// get single member by id
const getSingleMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    res.status(200).json({
      data: member,
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
// update member by id
const singleUpdateMember = async (req, res) => {
  try {
    await Member.findOneAndUpdate({ _id: req.params.id }, { ...req.body });

    res.status(201).json({
      message: "Member updated successfully!",
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
// delete member by id
const singleDeleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Member deleted Successfully!",
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
  getAllMember,
  singleCreateMember,
  searchMember,
  getSingleMember,
  singleUpdateMember,
  singleDeleteMember,
};
