// Express Module
const express = require('express')

// Router Module
const router = express.Router()

// Authorization
const { Authorization  } = require('../../utils')

// Import Controllers
const { AuthControllers } = require('../controllers')


// Login Route
router.post('/login', AuthControllers.signIn)

// Sign-Up Route
router.post('/sign-up', AuthControllers.signUp)


// User Management Login Route
router.post('/um-login', AuthControllers.loginToUserManagement)

// Change active status Route
router.put('/status/:userId', Authorization.verifyAccessToken, Authorization.isLoggedIn, Authorization.checkAdminPermissions, AuthControllers.changeActiveStatus)

// Logout Route
router.post('/logout', Authorization.verifyAccessToken, Authorization.isLoggedIn, AuthControllers.signOut)

// Export Router
module.exports = router