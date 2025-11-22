const mongoose = require('mongoose');

// Make Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
    }
}, {
    timestamps: true
})

// Create Model
const User = mongoose.model("User", userSchema)


module.exports = User;



