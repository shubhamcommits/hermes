// Import File Stream
const fs = require('fs')

// Express Module
const express = require('express')

// Define the express application
const app = express()

// Path Module
const path = require('path')

// Cors Module
const cors = require('cors')

// Morgan Module
const morgan = require('morgan')

// Compression Module
const compression = require('compression')

// Routes
const {
    AuthRoutes,
    ApiRoutes,
    AppRoutes,
    DataReckonRoutes,
    HealthCheckRoutes,
    JobRoutes,
    SalesPortalRoutes,
    ServiceRoutes,
    UserRoutes
} = require('./routes')

// Files Directory
const dir = './files'

// Staging Directory
const stagingDir = './files/staging'

// Processed Directory
const processedDir = './files/processed'

// Result Directory
const resultDir = './files/result'

// Create files directory if not exist
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

// Create staging directory if not exist
if (!fs.existsSync(stagingDir)) {
    fs.mkdirSync(stagingDir)
}

// Create processed directory if not exist
if (!fs.existsSync(processedDir)) {
    fs.mkdirSync(processedDir)
}

// Create result directory if not exist
if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir)
}

// Cors middleware for origin and Headers
app.use(cors())

// Adding The 'body-parser' middleware only handles JSON and urlencoded data
app.use(express.json())

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'))

// Correct REST naming
app.use('/api/v1/auths', AuthRoutes)
app.use('/api/v1/apps', AppRoutes)
app.use('/api/v1/custom-apis', ApiRoutes)
app.use('/api/v1/data-reckons', DataReckonRoutes)
app.use('/api/v1/health-checks', HealthCheckRoutes)
app.use('/api/v1/jobs', JobRoutes)
app.use('/api/v1/sales', SalesPortalRoutes)
app.use('/api/v1/services', ServiceRoutes)
app.use('/api/v1/users', UserRoutes)

// Static Folder for downloading files
app.use('/files', express.static(path.join(__dirname, '../files/result')));

// Serve Static Files from ANGULAR
app.use(express.static(path.join(__dirname, '../dist/client')));

// Client Facing Route
app.use('/', express.static(path.join(__dirname, '../dist/client/index.html')));

// Invalid routes handling middleware
app.all('*', (req, res, next) => {
    const error = new Error('Not found, check your URL please!')
    error.status = 404
    next(error)
})

// Default Route
app.use('/', (req, res, next) => {
    res.status(200).json({ message: 'SRE Server is Working!' })
})

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: JSON.stringify(error)
        }
    })
})

// In case of an error
app.on('error', (appErr, appCtx) => {
    console.error('Application error: ', appErr.stack);
    console.error('On url: ', appCtx.req.url);
    console.error('With headers: ', appCtx.req.headers);
})

// Compressing the application
app.use(compression())

// Export the application
module.exports = app