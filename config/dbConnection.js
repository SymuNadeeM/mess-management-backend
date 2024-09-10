const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/meal");
    console.log("mongodb connection success!");
  } catch (error) {
    console.log("mongodb connection failed!", err.message);
  }
};

module.exports = dbConnection;
