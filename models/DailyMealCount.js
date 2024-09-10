const mongoose = require("mongoose");

const dailyMealCountSchema = mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    mealCount: {
      type: Number,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const DailyMealCount = mongoose.model("DailyMealCount", dailyMealCountSchema);

module.exports = DailyMealCount;
