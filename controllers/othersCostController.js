const OthersCost = require("../models/OthersCost");

// get all others cost
const getAllOthersCost = async (req, res) => {
  try {
    const totalAmount = await OthersCost.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$costPrice",
          },
        },
      },
    ]);

    const othersCost = await OthersCost.find({})
      .populate("member", "_id name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Success",
      data: othersCost,
      amount: totalAmount[0]?.total || 0,
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
// create others cost
const singleCreateOthersCost = async (req, res) => {
  try {
    let othersCost = new OthersCost({ ...req.body });
    await othersCost.save();

    res.status(201).json({
      message: "Others Cost created Successfully",
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
// search others cost
const searchOthersCost = async (req, res) => {
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
// get single others cost by id
const getSingleOthersCost = async (req, res) => {
  try {
    const othersCost = await OthersCost.findById(req.params.id);

    res.status(200).json({
      data: othersCost,
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
// update others cost by id
const singleUpdateOthersCost = async (req, res) => {
  try {
    await OthersCost.findOneAndUpdate({ _id: req.params.id }, { ...req.body });

    res.status(201).json({
      message: "Others Cost updated successfully!",
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
// delete others cost by id
const singleDeleteOthersCost = async (req, res) => {
  try {
    await OthersCost.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Others Cost deleted Successfully!",
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
  getAllOthersCost,
  singleCreateOthersCost,
  searchOthersCost,
  getSingleOthersCost,
  singleUpdateOthersCost,
  singleDeleteOthersCost,
};
