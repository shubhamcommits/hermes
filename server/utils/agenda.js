// DotEnv Module
const dotenv = require('dotenv')

// Load the config from the .env file
dotenv.config()

// Import Agenda
const Agenda = require('agenda')

// Create Agenda Object
const agenda = new Agenda({
    defaultLockLifetime: 10000,
    processEvery: '1 minute',
    maxConcurrency: 100,
    db: {
        address: process.env.DB_URI,
        options: {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        collection: `jobs`
    }
})

// Export Module
module.exports = agenda