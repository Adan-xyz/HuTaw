const mongoose = require("mongoose");
const dotenv = require("dotenv"); dotenv.config();

const connect = async () => {
        try {
                await mongoose.connect(process.env.DB);
                console.log("Database connected...");
        } catch (error) {
                console.error("Error connecting to database:", error);
                throw error;
        }
};

module.exports = { connect };
