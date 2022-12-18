// Agenda Module
const agenda = require("../../utils/agenda")

// Import Models
const { Job, Api } = require('../models')

// Moment Module
const moment = require('moment')

// Import Services
const ApiService = require('./api.service')

// Job Service
const JobService = {

    async startJobProcessor() {
        return new Promise(async (resolve, reject) => {
            try {

                // Fetch all the current APIs
                let apis = await Api.find({ active: true }) || []

                // Find existing old Jobs
                let oldJobs = await agenda.jobs() || []

                if(apis.length > 0){
                    console.log('API: ', apis.length)
                }

                // Start the Agenda Server
                await agenda.start()

                // Subscribe to Global Start Event
                agenda.on('start', job => {
                    console.info(`Job Processor: STARTING - ${job.attrs.name} - ${moment().format('HH:mm:ss')}`)
                  })
                  
                // Subscribe to Global Complete Event
                agenda.on('complete', job => {
                    console.info(`Job Processor: COMPLETED - ${job.attrs.name} - ${moment().format('HH:mm:ss')}`)
                  })

                // Subscribe to Global Fail Event
                agenda.on('fail', job => {
                    console.info(`Job Processor: FAILED - ${job.attrs.name} - ${moment().format('HH:mm:ss')}`)
                  })

                // Resolve the job Object
                resolve('Processor has been started')

            } catch (error) {

                console.error('error', error)

                // Catch the error and reject the promise
                reject(error)
            }
        })
    },

    async createJob(jobName, intervalTime, baseFunction) {
        return new Promise(async (resolve, reject) => {
            try {

                // Define the job
                agenda.define(jobName, async (job) => {

                    // Call the Base Function
                    baseFunction()

                    // Save the result of Response
                    job.setShouldSaveResult(true)

                    // Console the Output
                    console.info(`Job Processor: EXECUTED - ${jobName} - ${moment().format('HH:mm:ss')}`)
                })

                // Set the details of the job
                await agenda.every(intervalTime, jobName)

                // Start the Agenda Server
                await agenda.start()

                // Console the output
                console.info(`Job Processor: CREATED - ${jobName} - ${moment().format('HH:mm:ss')}`)

                // Resolve the job Object
                resolve('Job has been created')

            } catch (error) {

                console.error('error', error)

                // Catch the error and reject the promise
                reject(error)
            }
        })
    },

    async getJob(jobName) {
        return new Promise(async (resolve, reject) => {
            try {

                // Job Details
                const jobDetails = await Job.findOne({ name: jobName })

                // If Job doesn't exist
                if (JSON.stringify(jobDetails) == JSON.stringify('{}') || JSON.stringify(null) == JSON.stringify(jobDetails))
                    resolve({
                        message: 'Job doesn\'t exist!',
                        job: {}
                    })

                // Resolve the job Object
                resolve({ name: jobName, message: 'Job details has been fetched, successfully!', job: jobDetails })

            } catch (error) {

                console.error('error', error)

                // Catch the error and reject the promise
                reject(error)
            }
        })
    },

    async removeJob(jobName) {
        return new Promise(async (resolve, reject) => {
            try {

                // Job Details
                const jobDetails = await agenda.cancel({ name: jobName })

                // Console the output
                console.info(`Job Processor: REMOVED - ${jobName} - ${moment().format('HH:mm:ss')}`)

                // Resolve the job Object
                resolve({ name: jobName, message: 'Job has been removed, successfully!', job: jobDetails })

            } catch (error) {

                console.error('error', error)

                // Catch the error and reject the promise
                reject(error)
            }
        })
    },

    async disableJob(jobName) {
        return new Promise(async (resolve, reject) => {
            try {

                // Job Details
                const jobDetails = await agenda.disable({ name: jobName })

                // Console the output
                console.info(`Job Processor: DISABLED - ${jobName} - ${moment().format('HH:mm:ss')}`)

                // Resolve the job Object
                resolve({ name: jobName, message: 'Job has been disabled, successfully!', job: jobDetails })

            } catch (error) {

                console.error('error', error)

                // Catch the error and reject the promise
                reject(error)
            }
        })
    },

    async enableJob(jobName) {
        return new Promise(async (resolve, reject) => {
            try {

                // Job Details
                const jobDetails = await agenda.enable({ name: jobName })

                // Console the output
                console.info(`Job Processor: ENABLED - ${jobName} - ${moment().format('HH:mm:ss')}`)

                // Resolve the job Object
                resolve({ name: jobName, message: 'Job has been enabled, successfully!', job: jobDetails })

            } catch (error) {

                console.error('error', error)

                // Catch the error and reject the promise
                reject(error)
            }
        })
    }


}

// Export Service
module.exports = JobService