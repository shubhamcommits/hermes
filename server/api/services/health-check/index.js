// AMHealthCheckService Routes
const AMHealthCheckService = require('./am.health-check.service')

// CMHealthCheckService Routes
const CMHealthCheckService = require('./cm.health-check.service')

// CPHealthCheckService Routes
const CPHealthCheckService = require('./cp.health-check.service')

// KYCHealthCheckService Routes
const KYCHealthCheckService = require('./kyc.health-check.service')

// UMHealthCheckService Routes
const UMHealthCheckService = require('./um.health-check.service')

// Export Services
module.exports = { AMHealthCheckService, CMHealthCheckService, CPHealthCheckService, KYCHealthCheckService, UMHealthCheckService }