// Mongoose Module
const mongoose = require('mongoose')

// Moment Module
const moment = require('moment')

// Import Schema
const { Schema } = mongoose

// Create Schema
const AuthSchema = new Schema({
  token: {
    type: String,
    default: null
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  last_login: {
    type: Date,
    default: moment().format()
  },
  last_logout: {
    type: Date,
    default: null
  },
  created_date: {
    type: Date,
    default: moment().format()
  },
  logged_in: {
    type: Boolean,
    default: true
  },
  ip_address : {
    type: String,
    defaul: null
  }
})

// Define Model
const Auth = mongoose.model('Auth', AuthSchema)

// Export Model
module.exports = Auth
