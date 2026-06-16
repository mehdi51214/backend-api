const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/mydb");
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("DB Connection Error:", error.message);
        console.log("Tip: Start MongoDB, then restart the server.");
    }
};

module.exports = connectDB;
 

