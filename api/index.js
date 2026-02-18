// Vercel Serverless Entry Point
// This file wraps the Express app for Vercel's serverless runtime

require('dotenv').config({ path: require('path').resolve(__dirname, '../backend/.env') });
const mongoose = require('mongoose');

// Cache the DB connection across warm serverless invocations
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = conn.connections[0].readyState === 1;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        throw error;
    }
};

const app = require('../backend/src/app');

// Wrap the Express app to ensure DB is connected before handling requests
module.exports = async (req, res) => {
    await connectDB();
    return app(req, res);
};
