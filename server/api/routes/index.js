// Auth Routes
const AuthRoutes = require('./auth.routes')

// App Routes
const AppRoutes = require('./app.routes')

// Api Routes
const ApiRoutes = require('./api.routes')

// Data Reckon Routes
const DataReckonRoutes = require('./data-reckon.routes')

// Health Check Routes
const HealthCheckRoutes = require('./health-check.routes')

// Job Routes
const JobRoutes = require('./job.routes')

// Sales Portal Routes
const SalesPortalRoutes = require('./sales-compass.routes')

// Service Routes
const ServiceRoutes = require('./service.routes')

//User Routes
const UserRoutes = require('./user.routes')

// Export Routes
module.exports = { 
    AuthRoutes, 
    AppRoutes, 
    ApiRoutes,
    DataReckonRoutes, 
    HealthCheckRoutes, 
    JobRoutes,
    SalesPortalRoutes,
    ServiceRoutes,
    UserRoutes
}