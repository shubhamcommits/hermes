// Mongoose Module
const mongoose = require('mongoose')

// Job Service
const { JobService } = require('./api/services')

// DotEnv Module
const dotenv = require('dotenv')

// Load the config from the .env file
dotenv.config()

// Initiate the Map of URLs
const uris = new Map()

// Set Local Value
uris.set('DB_URI', process.env.DB_URI)

function initConnection(uri, connectionName) {

    try {

        // Database connection
        const db = mongoose.createConnection(uri, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000
        })

        // Reject if an error occurred when trying to connect to MongoDB
        db.on('error', async function (error) {
            process.stdout.write(`\n MongoDB : connection - ${connectionName} - mongodb://${this.host}:${this.port}/${this.name}  ${JSON.stringify(error)} \n`)
            db.close().catch(() => process.stdout.write(`\n MongoDB : failed to close connection - ${this.name} \n`))
        })

        // Connected to DB
        db.on('connected', async function () {
            // mongoose.set('debug', function (col, method, query, doc) {
            //     process.stdout.write(`\n MongoDB : ${connectionName} - ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)}) \n`)
            // })
            process.stdout.write(`\n MongoDB : connected - ${connectionName} - mongodb://${this.host}:${this.port}/${this.name} \n`)

            // Start the Job processor
            await JobService.startJobProcessor()
                .then(() => {
                    process.stdout.write(`\n JOB : Processor has been started \n`)
                })
                .catch((error) => {
                    process.stdout.write(`\n JOB : There's been an error while starting the processor \n`)
                })
        })

        // Exit Process if there is no longer a Database Connection
        db.on('disconnected', async function () {
            process.stdout.write(`\n MongoDB : disconnected - ${connectionName} - mongodb://${this.host}:${this.port}/${this.name} \n`)

            // Initialise the connection again
            // initConnection(uri, connectionName)
        })

        // Return db
        return db

    } catch (error) {

        process.stdout.write(`\n MongoDB Connection Error : ${error}`)

        return null
    }

}

// Iterate over each entry of the MAP
for (var entry of uris.entries()) {

    // Create Connection
    let connection = initConnection(entry[1], entry[0])

    // Connect with each Environment
    if (connection != null) {
        uris.set(entry[0], connection)
    }
}

// Export the Map with Unique Value
module.exports = uris