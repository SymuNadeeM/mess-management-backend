const BazarList = require("../models/BazarList");

// get all Bazar List
const getAllBazarList = async (req, res) => {
  try {
    const totalAmount = await BazarList.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$itemAmount",
          },
        },
      },
    ]);

    const bazarList = await BazarList.find({})
      .sort({ createdAt: -1 })
      .populate("member", "_id name email phone");

    res.status(200).json({
      message: "Success",
      data: bazarList,
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

// create Bazar List
const singleCreateBazarList = async (req, res) => {
  try {
    let bazarList = new BazarList({ ...req.body });
    await bazarList.save();

    res.status(201).json({
      message: "BazarList created Successfully",
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
// search Bazar List
const searchBazarList = async (req, res) => {
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
// get single Bazar List by id
const getSingleBazarList = async (req, res) => {
  try {
    const bazarList = await BazarList.findById(req.params.id);

    res.status(200).json({
      data: bazarList,
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
// update Bazar List by id
const singleUpdateBazarList = async (req, res) => {
  try {
    await BazarList.findOneAndUpdate({ _id: req.params.id }, { ...req.body });

    res.status(201).json({
      message: "BazarList updated successfully!",
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
// delete Bazar List by id
const singleDeleteBazarList = async (req, res) => {
  try {
    await BazarList.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "BazarList deleted Successfully!",
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
  getAllBazarList,
  singleCreateBazarList,
  searchBazarList,
  getSingleBazarList,
  singleUpdateBazarList,
  singleDeleteBazarList,
};
