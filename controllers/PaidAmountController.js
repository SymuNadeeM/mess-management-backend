const PaidAmount = require("../models/PaidAmount");

// get all paid amount
const getAllPaidAmount = async (req, res) => {
  try {
    // amount sum PaidAmount
    const totalAmount = await PaidAmount.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const paidAmount = await PaidAmount.find({})
      .populate("member", "_id name email phone")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Success",
      data: paidAmount,
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
// create paid amount
const singleCreatePaidAmount = async (req, res) => {
  try {
    const findData = await PaidAmount.findOne({
      member: req.body.member,
    });

    if (findData) {
      findData.amount = findData.amount + Number(req.body.amount);
      await findData.save();
    } else {
      let paidAmount = new PaidAmount({
        ...req.body,
      });

      await paidAmount.save();
    }

    res.status(201).json({
      message: "Paid Amount created Successfully",
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
// search paid amount
const searchPaidAmount = async (req, res) => {
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
// get single paid amount by id
const getSinglePaidAmount = async (req, res) => {
  try {
    const paidAmount = await PaidAmount.findById(req.params.id);

    res.status(200).json({
      data: paidAmount,
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
// update paid amount by id
const singleUpdatePaidAmount = async (req, res) => {
  try {
    await PaidAmount.findOneAndUpdate({ _id: req.params.id }, { ...req.body });

    res.status(201).json({
      message: "Paid Amount updated successfully!",
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
// delete paid amount by id
const singleDeletePaidAmount = async (req, res) => {
  try {
    await PaidAmount.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Paid Amount deleted Successfully!",
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
  getAllPaidAmount,
  singleCreatePaidAmount,
  searchPaidAmount,
  getSinglePaidAmount,
  singleUpdatePaidAmount,
  singleDeletePaidAmount,
};
