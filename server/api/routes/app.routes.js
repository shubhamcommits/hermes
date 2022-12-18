// Express Module
const express = require('express')

// Router Module
const router = express.Router()

// Authorization
const { Authorization  } = require('../../utils')

// Import Controllers
const { AppControllers } = require('../controllers')

// Verify Access Token
router.use(Authorization.verifyAccessToken)

// Verify If the current user isLoggedIn 
router.use(Authorization.isLoggedIn)

// Get All Apps Route
router.get('/', AppControllers.getAllUserApps)

// Create App Route
router.post('/', AppControllers.createApp)

// Remove App Route
router.delete('/:appId', AppControllers.removeApp)

// Export Router
module.exports = router