const mongoose = require("mongoose");

let uri = "mongodb+srv://Rudra:Rudra_2674@cluster0.waeohei.mongodb.net/?retryWrites=true&w=majority";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;