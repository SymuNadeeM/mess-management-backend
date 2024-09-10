const mongoose = require("mongoose");

const bazarScheduleSchema = mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const BazarSchedule = mongoose.model("BazarSchedule", bazarScheduleSchema);

module.exports = BazarSchedule;
