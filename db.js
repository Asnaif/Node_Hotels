const mongoose = require('mongoose');
require('dotenv').config();

// Define MongoDB Connection URI
const mongoURI = process.env.MONGODB_URL_LOCAL  // Use 127.0.0.1 instead of localhost for IPv4
//const mongoURI = process.env.MONGODB_URL;

// Set up MongoDB Connection
mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB server'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('⚠️ MongoDB connection disconnected');
});

// Export the database connection
module.exports = db;
