// Auth Controllers
const AuthControllers = require('./auth.controllers')

// Api Controllers
const ApiControllers = require('./api.controllers')

// App Controllers
const AppControllers = require('./app.controllers')

// Data Reckon Controllers
const DataReckonControllers = require('./data-reckon.controllers')

// Health Check Controllers
const HealthCheckControllers = require('./health-check.controllers')

// Job Controllers
const JobControllers = require('./job.controllers')

// Sales Portal Controllers
const SalesPortalControllers = require('./sales-compass.controllers')

// Service Controllers
const ServiceControllers = require('./service.controllers')

//User Controllers
const UserControllers = require('./user.controllers')

// Export Controllers
module.exports = {
    AuthControllers,
    ApiControllers,
    AppControllers,
    DataReckonControllers,
    HealthCheckControllers,
    JobControllers,
    SalesPortalControllers,
    ServiceControllers,
    UserControllers
}