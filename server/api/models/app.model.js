// Mongoose Module
const mongoose = require('mongoose')

// Moment Module
const moment = require('moment')

// Import Schema
const { Schema } = mongoose

// Create Schema
const AppSchema = new Schema({
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        default: 'default_app.png'
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
    created_date: {
        type: Date,
        default: moment().format()
    },
    _user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// Define Model
const App = mongoose.model('App', AppSchema)

// Export Model
module.exports = App