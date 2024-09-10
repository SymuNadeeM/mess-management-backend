const mongoose = require("mongoose");

const paidAmountSchema = mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    amount: {
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

const PaidAmount = mongoose.model("PaidAmount", paidAmountSchema);

module.exports = PaidAmount;
