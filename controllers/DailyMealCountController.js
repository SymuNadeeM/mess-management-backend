const DailyMealCount = require("../models/DailyMealCount");

// get all daily meal count
const getAllDailyMealCount = async (req, res) => {
  try {
    const totalAmount = await DailyMealCount.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$mealCount",
          },
        },
      },
    ]);

    const dailyMealCount = await DailyMealCount.aggregate([
      {
        $group: {
          _id: "$member",
          mealCount: { $sum: "$mealCount" },
          date: { $first: "$date" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {
        $lookup: {
          from: "members",
          localField: "_id",
          foreignField: "_id",
          as: "member",
        },
      },
      {
        $sort: {mealCount:-1}
      },
      {
        $unwind: "$member",
      },
      {
        $project: {
          _id: "$_id",
          member: {
            name: "$member.name",
            email: "$member.email",
            phone: "$member.phone",
          },
          mealCount: 1,
          date: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    // const dailyMealCount = await DailyMealCount.find({})
    //   .sort({
    //     createdAt: -1,
    //   })
    //   .populate("member", "_id name email phone");

    res.status(200).json({
      message: "Success",
      data: dailyMealCount,
      mealCount: totalAmount[0]?.total || 0,
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
// create daily meal count
const singleCreateDailyMealCount = async (req, res) => {
  try {
    let dailyMealCount = new DailyMealCount({ ...req.body });
    await dailyMealCount.save();

    res.status(201).json({
      message: "Daily Meal Count created Successfully",
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
// search daily meal count
const searchDailyMealCount = async (req, res) => {
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
// get single daily meal count by id
const getSingleDailyMealCount = async (req, res) => {
  try {
    const dailyMealCount = await DailyMealCount.findById(req.params.id);

    res.status(200).json({
      data: dailyMealCount,
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
// update daily meal count by id
const singleUpdateDailyMealCount = async (req, res) => {
  try {
    await DailyMealCount.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );

    res.status(201).json({
      message: "Daily Meal Count updated successfully!",
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
// delete daily meal count by id
const singleDeleteDailyMealCount = async (req, res) => {
  try {
    await DailyMealCount.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Daily Meal Count deleted Successfully!",
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
  getAllDailyMealCount,
  singleCreateDailyMealCount,
  searchDailyMealCount,
  getSingleDailyMealCount,
  singleUpdateDailyMealCount,
  singleDeleteDailyMealCount,
};
