// Import Models
const { App, Service, Api } = require('../models')

// Import File Stream Module
const { Readable } = require('stream')

// Import Job Service
const JobService = require('./job.service')

// App Service
const AppService = {

    async createApp(name, alias, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Create the app
                const app = await App.create({
                    name: name,
                    alias: alias || name,
                    _user: userId
                })

                // Resolve the promise
                resolve(app)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for fetching all for currently loggedIn user
     * @returns 
     */
    async getAllUserApps(requestUserId) {
        return new Promise(async (resolve, reject) => {
            try {

                // apps array
                let apps = []

                apps = await App.find({
                    _user: requestUserId,
                    active: true,
                })
                    .populate('services')
                    .sort('-created_date') || []

                // Resolve the promise
                resolve(apps)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * This function is responsible for removing the app from the server
     * 1. Removes the App from collections
     * 2. Removes all the Services from collections
     * 3. Removes and disables all the associated apis
     * @param {*} appId 
     * @returns 
     */
    async removeApp(appId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the app and remove the entry from the system
                App.findByIdAndDelete(appId)
                    .then(async (app) => {

                        // Remove all the Services from the App
                        Readable.from(app.services)
                            .on('data', async (service) => {

                                // Find the service and remove the entry from the system
                                Service.findByIdAndDelete(service)
                                    .then(async (service) => {

                                        // Remove all the APIs from the service
                                        Readable.from(service.apis)
                                            .on('data', async (api) => {

                                                // Remove the api
                                                Api.findByIdAndDelete(api)
                                                    .then(async (api) => {

                                                        // Disables all the jobs associated with that API
                                                        JobService.disableJob(`${api._id}_${api.name}`)

                                                        // Remove all the jobs associated with that API
                                                        JobService.removeJob(`${api._id}_${api.name}`)

                                                    })
                                                    .catch((error) => {

                                                        // Catch the error and reject the promise
                                                        reject({ error: error })
                                                    })
                                            })
                                    })
                                    .catch((error) => {

                                        // Catch the error and reject the promise
                                        reject({ error: error })
                                    })
                            })

                        // Resolve the promise
                        resolve(app)
                    })
                    .catch((error) => {

                        // Catch the error and reject the promise
                        reject({ error: error })
                    })

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    }

}

// Export Service
module.exports = AppService