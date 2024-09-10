const BazarSchedule = require("../models/BazarSchedule");

// get all bazar schedule
const getAllBazarSchedule = async (req, res) => {
  try {
    const bazarSchedule = await BazarSchedule.find({})
      .populate("member", "_id name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      data: bazarSchedule,
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
// create bazar schedule
const singleCreateBazarSchedule = async (req, res) => {
  try {
    let bazarSchedule = new BazarSchedule({ ...req.body });
    await bazarSchedule.save();

    res.status(201).json({
      message: "Bazar Schedule created Successfully",
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
// search bazar schedule
const searchBazarSchedule = async (req, res) => {
  const { date } = req.query;

  const findDate = new Date(date) || new Date().toDateString();

  try {
    const bazarSchedule = await BazarSchedule.find({
      date: findDate,
    }).populate("member", "_id name email phone");

    res.status(200).json({
      message: "Success",
      data: bazarSchedule,
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
// get single bazar schedule by id
const getSingleBazarSchedule = async (req, res) => {
  try {
    const bazarSchedule = await BazarSchedule.findById(req.params.id);

    res.status(200).json({
      data: bazarSchedule,
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
// update bazar schedule by id
const singleUpdateBazarSchedule = async (req, res) => {
  try {
    await BazarSchedule.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );

    res.status(201).json({
      message: "Bazar Schedule updated successfully!",
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
// delete bazar schedule by id
const singleDeleteBazarSchedule = async (req, res) => {
  try {
    await BazarSchedule.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Bazar Schedule deleted Successfully!",
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
  getAllBazarSchedule,
  singleCreateBazarSchedule,
  searchBazarSchedule,
  getSingleBazarSchedule,
  singleUpdateBazarSchedule,
  singleDeleteBazarSchedule,
};
