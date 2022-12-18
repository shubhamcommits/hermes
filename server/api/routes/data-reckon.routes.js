// Express Module
const express = require('express')

// Data Reckon Controllers
const { DataReckonControllers } = require('../controllers')

// Router Module
const router = express.Router()

// Get all collections
router.get('/collections', DataReckonControllers.getAllCollections)

// Get data by entity status
router.get('/collection', DataReckonControllers.getCollectionDataByStatus)

// Get Distinct CP Roles
router.get('/cp-roles', DataReckonControllers.getDistinctCPRoles)

// Get Bulk Upload Fields
router.get('/bulk-upload-fields', DataReckonControllers.getBulkUploadCollectionFields)

// Get Difference Checker Fields
router.get('/diff-checker', DataReckonControllers.jsonAnamolyDetection)

// Export Router
module.exports = router