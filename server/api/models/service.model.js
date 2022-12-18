// Mongoose Module
const mongoose = require('mongoose')

// Moment Module
const moment = require('moment')

// Import Schema
const { Schema } = mongoose

// Create Schema
const ServiceSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    last_status: {
        type: String,
        required: true,
        default: 'healthy',
        enum: ['healthy', 'unhealthy', 'broken']
    },
    apis: [{
        type: Schema.Types.ObjectId,
        ref: 'Api'
    }],
    created_date: {
        type: Date,
        default: moment().format()
    },
    _app: {
        type: Schema.Types.ObjectId,
        ref: 'App'
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

// Define Model
const Service = mongoose.model('Service', ServiceSchema)

// Export Model
module.exports = Service