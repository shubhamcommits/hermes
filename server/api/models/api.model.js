// Mongoose Module
const mongoose = require('mongoose')

// Moment Module
const moment = require('moment')

// Import Schema
const { Schema } = mongoose

// Create Schema
const ApiSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    opco: {
        type: String,
        required: true
    },
    end_point: {
        type: String,
        required: true
    },
    body: [{
        type: Schema.Types.Mixed
    }],
    authorization_via_um: {
        type: Boolean,
        required: true,
        default: true
    },
    headers: [{
        type: Schema.Types.Mixed
    }],
    params: [{
        type: Schema.Types.Mixed
    }],
    curl: {
        type: String
    },
    created_date: {
        type: Date,
        default: moment().format()
    },
    time_interval: {
        type: String,
        default: '10 seconds'
    },
    last_status: {
        type: String,
        required: true,
        default: 'unknown',
        enum: ['healthy', 'unhealthy', 'broken', 'unknown']
    },
    failed_count: {
        type: Number,
        default: 0,
        required: true
    },
    last_run_time: {
        type: Date,
        default: moment().format()
    },
    response: [{
        type: Schema.Types.Mixed
    }],
    _service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
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
const Api = mongoose.model('Api', ApiSchema)

// Export Model
module.exports = Api