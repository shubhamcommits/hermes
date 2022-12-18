// Mongoose Module
const mongoose = require('mongoose')

// Job Service
const { JobService } = require('./api/services')

// Moment Module
const moment = require('moment')

// Cache MongoDB Connection
let cachedMongoConn = null

module.exports = {
    connectDatabase() {
        return new Promise((resolve, reject) => {

            // Get Global Promise
            mongoose.Promise = global.Promise

            // Set Options
            var __setOptions = mongoose.Query.prototype.setOptions;

            // Set the lean true by default
            mongoose.Query.prototype.setOptions = function (options, overwrite) {
                __setOptions.apply(this, arguments);
                if (this.options.lean == null) this.options.lean = true;
                return this;
            };

            // Init Connections
            mongoose.connection

                // Reject if an error occurred when trying to connect to MongoDB
                .on('error', error => {
                    process.stdout.write('\n Error: connection to DB failed \n')
                    
                    // Close the connection on error
                    mongoose.connection.close(true)

                    // Reject the error
                    reject(error)
                })

                // Exit Process if there is no longer a Database Connection
                .on('close', () => {
                    process.stdout.write('\n Error: Connection to DB lost \n')
                    process.exit(1)
                })

                // Connected to DB
                .once('open', async () => {
                    // Display connection information
                    const infos = mongoose.connections

                    infos.map(info => process.stdout.write(`\n Database Connection: mongodb://${info.host}:${info.port}/${info.name} \n`))

                    // Start the Job
                    // let jobs = await agenda.jobs() || []

                    // if (jobs.length > 0) {
                    //     jobs.forEach((job, index) => {
                    //         if (job.attrs.nextRunAt != null && job.attrs.nextRunAt != undefined && job.attrs.hasOwnProperty('nextRunAt')) {
                    //             if (moment(job.attrs.nextRunAt).isAfter() == false) {
                    //                 let repeatInterval = job.attrs.repeatInterval.split(' ') || []
                    //                 let timeValue = repeatInterval[0] || 0
                    //                 let timeUnit = repeatInterval[1] || 'seconds'
                    //                 let absoluteDifference = 0
                    //                 if (timeUnit == 'seconds')
                    //                     absoluteDifference = timeValue
                    //                 else if (timeUnit == 'minutes')
                    //                     absoluteDifference = timeValue * 60
                    //                 else if (timeUnit == 'hours')
                    //                     absoluteDifference = timeValue * 60 * 60
                    //                 else if (timeUnit == 'days')
                    //                     absoluteDifference = timeValue * 60 * 60 * 24
                    //                 else if (timeUnit == 'weeks')
                    //                     absoluteDifference = timeValue * 60 * 60 * 24 * 7
                    //                 else
                    //                     absoluteDifference = 0
                    //             }
                    //         }
                    //     })
                    // }

                    // mongoose.connection.db.collection('jobs')
                    // .updateMany(
                    //     { }, 
                    //     { $unset: {
                    //         lockedAt: undefined,
                    //         lastModifiedBy: undefined,
                    //         lastRunAt: undefined
                    //     }, $set: { nextRunAt: moment().add(20, 'seconds').toDate() }
                    //     }, 
                    //     { multi: true }, (error, numUnlocked)=>{
                    //         if (error)
                    //             console.error(error)
                    //         process.stdout.write(`\n Unlocked ${JSON.stringify(numUnlocked)} jobs \n`)
                    //     })

                    // Start the Job processor
                    // await JobService.startJobProcessor()
                    //     .then(() => {
                    //         process.stdout.write(`\n JOB : Processor has been started \n`)
                    //     })
                    //     .catch((error) => {
                    //         process.stdout.write(`\n JOB : There's been an error while starting the processor \n`)
                    //     })

                    // Return successful promise
                    resolve(cachedMongoConn)
                })

            // MongoDB Connection
            if (!cachedMongoConn) {
                cachedMongoConn = mongoose.connect(process.env.DB_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    connectTimeoutMS: 10000,
                    keepAlive: true
                })
            } else {
                process.stdout.write('\n MongoDB: using cached database instance \n')
                resolve(cachedMongoConn)
            }
        })
    }
}