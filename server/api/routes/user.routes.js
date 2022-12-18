// Express Module
const express = require('express')

// Router Module
const router = express.Router();

// Import Controllers
const { UserControllers } = require('../controllers')

router.get('/get-users/:userId', UserControllers.getCurrentUsers )

module.exports = router;

