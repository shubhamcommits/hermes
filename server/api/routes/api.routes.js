// Express Module
const express = require('express')

// Router Module
const router = express.Router()

// Authorization
const { Authorization  } = require('../../utils')

// Import Controllers
const { ApiControllers } = require('../controllers')

// Verify Access Token
router.use(Authorization.verifyAccessToken)

// Verify If the current user isLoggedIn 
router.use(Authorization.isLoggedIn)

// Get All Apis Route
router.get('/', ApiControllers.getAllServiceApis)

// Create Api Rouite
router.post('/', ApiControllers.createApi)

// Get API Details Route
router.get('/:apiId', ApiControllers.getApiDetails)

// Remove API Route
router.delete('/:apiId', ApiControllers.removeApi)

// Change active status Route
router.put('/status/:apiId', ApiControllers.changeActiveStatus)

// Export Router
module.exports = router