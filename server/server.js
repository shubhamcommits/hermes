// Import File Stream Module
const { Readable } = require('stream')

// Import Cluster Module
const cluster = require('cluster')

// Fetch Number of CPU Cores 
const cpus = require('os').cpus()

// DotEnv Module
const dotenv = require('dotenv')

// Load the config from the .env file
dotenv.config()

// Mongoose connection
const { connectDatabase } = require('./db')

// Cluster variable
const isClusterRequired = process.env.CLUSTER

/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
const setupWorkerProcesses = () => {

    // Console the confirmation
    process.stdout.write(`\n Master cluster is setting up ` + cpus.length + ' workers \n')
    process.stdout.write(`\n Master PID: ${process.pid} is running \n`)

    // Fork workers
    Readable.from(cpus)
    .on('data', (cpu)=>{
        process.stdout.write(`\n Message: ${cpu.model} is starting ... \n`)
        cluster.fork()
    })

    // Handle Message from Cluster
    cluster.on('message', function (message) {
        process.stdout.write(`\n Message: ${message} \n`)
    })

    // Handle online
    cluster.on('online', (worker) => {
        process.stdout.write(`\n Worker ID: ${worker.id} and the PID: ${worker.process.pid} \n`)
    })

    // Handle on exit
    cluster.on('exit', (worker, code, signal) => {
        process.stdout.write(`\n Worker ID: ${worker.id} with PID: ${worker.process.pid} died with CODE: ${code} and SIGNAL: ${signal} \n`)
        process.stdout.write(`\n Forking another Worker \n`)
        cluster.fork()
    })

    // Handle on error
    cluster.on('error', (error) => {
        process.stdout.write(`\n Error: ${error} \n`)
    })

}

/**
 * Setup an express server and define port to listen all incoming requests for this application
 */
const setUpExpressApplication = async () => {

    // Connect Database
    await connectDatabase()
        .then(() => {

            // Express App
            const app = require('./api/app')

            // HTTP Module
            const http = require('http')

            // Define Application port
            const port = process.env.PORT

            // Defining the Host Name
            const host = process.env.HOST

            // Environment State Variable
            const env = process.env.NODE_ENV

            // Creating Microservice Server
            const server = http.createServer(app)

            // Exposing the server to the desired port
            server.listen(port, host, async () => {
                process.stdout.write(`\n SRE Automation Server : http://${host}:${port}\n`)
                process.stdout.write(`\n Environment : ${env}\n`)
                process.stdout.write(`\n Process : ${process.pid} is listening to all incoming requests \n`)
            })
        })
        .catch(error => {
            process.stdout.write('\n Could not connect to database', { error }, '\n')
            process.exit()
        })
}

/**
 * Setup server either with clustering or without it
 * @param isClusterRequired
 * @constructor
 */

// If it is a master process then call setting up worker process
if (isClusterRequired == 'true' && cluster.isMaster) {

    setupWorkerProcesses()

} else {

    // To setup server configurations and share port address for incoming requests
    setUpExpressApplication()
}