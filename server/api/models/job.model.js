// Mongoose Module
const mongoose = require('mongoose')

// Moment Module
const moment = require('moment')

// Import Schema
const { Schema } = mongoose

// Create Schema
const JobSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});

// Define Model
const Job = mongoose.model('Job', JobSchema)

// Export Model
module.exports = Job