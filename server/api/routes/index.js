// Auth Routes
const AuthRoutes = require('./auth.routes')

// App Routes
const AppRoutes = require('./app.routes')

// Api Routes
const ApiRoutes = require('./api.routes')

// Health Check Routes
const HealthCheckRoutes = require('./health-check.routes')

// Job Routes
const JobRoutes = require('./job.routes')

// Service Routes
const ServiceRoutes = require('./service.routes')

//User Routes
const UserRoutes = require('./user.routes')

// Export Routes
module.exports = { 
    AuthRoutes, 
    AppRoutes, 
    ApiRoutes,
    HealthCheckRoutes, 
    JobRoutes,
    ServiceRoutes,
    UserRoutes
}