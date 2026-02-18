require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./config/logger');
const connectDB = require('./config/db');

// Handle Uncaught Exceptions
process.on('uncaughtException', err => {
    logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    logger.error(err.name, err.message);
    process.exit(1);
});

// Connect Database
connectDB();

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    logger.info(`App running on port ${port}...`);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', err => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    logger.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
