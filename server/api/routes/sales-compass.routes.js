// Express Module
const express = require('express')

// Router Module
const router = express.Router()

// Import Controllers
const { SalesPortalControllers } = require('../controllers')

// Login to Sales Portal Route
router.post('/login', SalesPortalControllers.loginUserToSalesPortal)

// Process file and start the process
router.post('/process-file', SalesPortalControllers.processUserFiles)

// Stop Process Interval
router.put('/stop-process/:processId', SalesPortalControllers.stopProcessInterval)

// Export Router
module.exports = router