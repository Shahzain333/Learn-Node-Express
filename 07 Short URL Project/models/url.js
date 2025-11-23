const mongoose = require('mongoose');

// Define the schema for URLs

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [
        {
            timestamp: { 
                type: Number
            }
        }
   ]
}, {
    timestamps: true
})

// Create a model using the schema
const URL = mongoose.model('url', urlSchema)

module.exports = URL;
