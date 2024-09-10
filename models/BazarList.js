const mongoose = require("mongoose");

const bazarListSchema = mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    itemDescription: {
      type: String,
      required: true,
      trim: true,
    },
    // itemQuantity: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // unit: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    itemAmount: {
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

const BazarList = mongoose.model("BazarList", bazarListSchema);

module.exports = BazarList;
