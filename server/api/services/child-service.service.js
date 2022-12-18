// Import Models
const { App, Service, Api } = require('../models')

// Import File Stream Module
const { Readable } = require('stream')

// Import Job Service
const JobService = require('./job.service')

// Child Service
const ChildService = {

    async createService(name, userId, appId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Create the Service
                const childService = await Service.create({
                    name: name,
                    _app: appId,
                    _user: userId
                })

                // Update the Application
                await App.findOneAndUpdate(
                    { _id: appId },
                    { $push: { services: childService._id } },
                    { new: true })

                // Resolve the promise
                resolve(childService)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for fetching the Service Details from the server
     * @param {*} serviceId 
     * @returns 
     */
     async getServiceDetails(serviceId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Fetch the service
                let service = await Service.findById(serviceId)
                    .populate('_app')

                // Resolve the promise
                resolve(service)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for fetching all services in an application
     * @returns 
     */
    async getAllUserServices(requestUserId, appId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Services array
                let services = []

                // Find the apps
                services = await Service.find({
                    _user: requestUserId,
                    _app: appId,
                    active: true,
                })
                    .sort('-created_date') || []

                // Resolve the promise
                resolve(services)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * This function is responsible for removing the Service from the server
     * 1. Removes the Service from collections
     * 2. Removes and disables all the associated apis
     * 3. Pull the Service-ID from the corresponding Application
     * @param {*} apiId 
     * @returns 
     */
    async removeService(serviceId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the service and remove the entry from the system
                Service.findByIdAndDelete(serviceId)
                    .then(async (service) => {

                        // Pull Service ID from APP
                        await App.findOneAndUpdate(
                            { _id: service._app },
                            { $pull: { services: serviceId } },
                            { new: true }
                        )

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

                        // Resolve the promise
                        resolve(service)
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
module.exports = ChildService