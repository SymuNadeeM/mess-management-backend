const BazarList = require("../models/BazarList");
const DailyMealCount = require("../models/DailyMealCount");
const Member = require("../models/Member");
const OthersCost = require("../models/OthersCost");
const PaidAmount = require("../models/PaidAmount");

const dashboardController = async (req, res) => {
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
  const totalMealCount = await DailyMealCount.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$mealCount",
        },
      },
    },
  ]);
  const totalOthersCost = await OthersCost.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$costPrice",
        },
      },
    },
  ]);
  const totalBazarCost = await BazarList.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$itemAmount",
        },
      },
    },
  ]);

  res.json({
    totalAmount: totalAmount[0]?.total || 0,
    totalMealCount: totalMealCount[0]?.total || 0,
    totalOthersCost: totalOthersCost[0]?.total || 0,
    totalBazarCost: totalBazarCost[0]?.total || 0,
  });
};

const summaryController = async (req, res) => {
  const totalBazarCost = await BazarList.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$itemAmount",
        },
      },
    },
  ]);
  const totalOthersCost = await OthersCost.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$costPrice",
        },
      },
    },
  ]);
  const totalMember = await Member.countDocuments({});

  const extraCostPerPerson = (totalOthersCost[0]?.total || 0) / totalMember;

  const totalMealCount = await DailyMealCount.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$mealCount",
        },
      },
    },
  ]);

  const oneMealCost = totalBazarCost[0]?.total / totalMealCount[0]?.total || 0;

  const paidAmount = await PaidAmount.find({})
    .sort({ createdAt: -1 })
    .populate("member", "_id name email phone");

  const dailyMealCount = await DailyMealCount.aggregate([
    {
      $group: {
        _id: "$member",
        mealCount: { $sum: "$mealCount" },
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
      $unwind: "$member",
    },
    {
      $project: {
        _id: "$_id",
        mealCount: 1,
      },
    },
  ]);

  res.json({
    paidAmount,
    oneMealCost,
    dailyMealCount,
    extraCostPerPerson,
  });
};

module.exports = { dashboardController, summaryController };
