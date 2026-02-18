const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        // Email might not be available from Instagram Basic Display API, so it's optional or needs another way
        // For now, we'll keep it as optional since we are relying on Instagram
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profilePic: String,
    instagram: {
        id: {
            type: String,
            unique: true,
            required: true
        },
        username: String,
        account_type: {
            type: String,
            enum: ['BUSINESS', 'CREATOR'],
            required: true
        },
        access_token: String, // Store long-lived token
        token_expiry: Date,
        followers_count: Number,
        media_count: Number,
        biography: String,
        website: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
