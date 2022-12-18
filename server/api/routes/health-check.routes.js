// Express Module
const express = require('express')

// Router Module
const router = express.Router()

// Authorization
const { Authorization  } = require('../../utils')

// Import Controllers
const { HealthCheckControllers } = require('../controllers')

// User Management Route
router.post('/user-management', HealthCheckControllers.checkUserManagement)

// Airtem Money Route
router.post('/airtel-money', HealthCheckControllers.checkAirtelMoneyService)

// Export Router
module.exports = router