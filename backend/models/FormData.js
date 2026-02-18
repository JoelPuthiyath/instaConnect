const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, required: false }, // Password optional for social login
    googleId: { type: String, unique: true, sparse: true }, // Sparse allows multiple nulls if not using Google
    profilePic: String,
    instagram: {
        id: { type: String, unique: true, sparse: true },
        username: String,
        account_type: String,
        profile_picture_url: String
    }
})

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;
