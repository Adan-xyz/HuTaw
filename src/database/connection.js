const mongoose = require('mongoose');
const dotenv = require('dotenv'); dotenv.config();

// NOTE: MongoDB Atlas must have its IP Access List set to allow 0.0.0.0/0
// (allow connections from anywhere) because Replit uses dynamic IP addresses
// that change frequently and cannot be allowlisted individually.

const connect = async () => {
        if (!process.env.DB) {
                const err = new Error('FATAL: DB environment variable is not set. Cannot connect to MongoDB.');
                console.error(err.message);
                throw err;
        }

        try {
                await mongoose.connect(process.env.DB);
                console.log('Database connected...');
        } catch (error) {
                console.error('Error connecting to database:', error);
                throw error;
        }
}

module.exports = { connect };
