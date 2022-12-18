// Moment Module
const moment = require('moment')

// Import Models
const { Api, Service } = require('../models')

// Import Auth Services
const AuthService = require('./auth.service')

// Import Job Service
const JobService = require('./job.service')

// Import Helper Service
const HelperService = require('./helper.service')

// Api Service
const ApiService = {

    /**
     * This function is responsible for fetching the API Details from the server
     * @param {*} apiId 
     * @returns 
     */
    async getApiDetails(apiId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Create the app
                let api = await Api.findById(apiId)
                    .populate('_app')
                    .populate('_service')

                // Resolve the promise
                resolve(api)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for removing the API from the server
     * 1. Removes the API from collections
     * 2. Removes and disables all the associated jobs related to that api
     * 3. Pull the API-ID from the corresponding services
     * @param {*} apiId 
     * @returns 
     */
    async removeApi(apiId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Create the app
                Api.findByIdAndDelete(apiId)
                    .then(async (api) => {

                        // Pull API ID from Service
                        await Service.findOneAndUpdate(
                            { _id: api._service },
                            { $pull: { apis: apiId } },
                            { new: true }
                        )

                        // Disables all the jobs associated with that API
                        JobService.disableJob(`${api._id}_${api.name}`)

                        // Remove all the jobs associated with that API
                        JobService.removeJob(`${api._id}_${api.name}`)

                        // Resolve the promise
                        resolve(api._id)
                    })
                    .catch((error) => {

                        // Catch the error and reject the promise
                        reject({ error: error })
                    })

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    async createApi(name, method, opco, end_point, authorization_via_um, serviceId, appId, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Create the app
                let api = await Api.create({
                    name: name,
                    method: method,
                    opco: opco,
                    end_point: end_point,
                    authorization_via_um: authorization_via_um,
                    _app: appId,
                    _service: serviceId,
                    _user: userId
                })

                // Push API ID into Service
                await Service.findOneAndUpdate(
                    { _id: api._service },
                    { $push: { apis: api._id } },
                    { new: true }
                )

                // Resolve the promise
                resolve(api)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for activating/deactivating the API
     * @param {*} userId 
     * @returns 
     */
    async changeActiveStatus(apiId, active, intervalTime) {
        return new Promise(async (resolve, reject) => {
            try {

                // Update API
                let api = await Api.findOneAndUpdate({
                    _id: apiId
                }, {
                    $set: {
                        active: active,
                        time_interval: intervalTime
                    }
                }, {
                    new: true
                })
                    .catch((error) => {
                        console.error(error)
                        reject({
                            error: error
                        })
                    })

                // Create the Job Name
                let jobName = `${api._id}_${api.name}`

                if (active == true) {

                    // Create the Job and start the same in the background
                    JobService.createJob(jobName, intervalTime, async () => {

                        // Call Custom API Details
                        await ApiService.callCustomApi(jobName)
                    })

                    // Resolve the promise
                    resolve({
                        message: "API's active status changed successfully!"
                    })

                } else if (active == false) {

                    // Disable the Job from the server
                    await JobService.disableJob(jobName)

                    // Remove the Job from the server
                    await JobService.removeJob(jobName)

                    // Resolve the promise
                    resolve({
                        message: "API's active status changed successfully!"
                    })
                }

            } catch (error) {

                console.error(error)

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for fetching all apis for current service user
     * @returns 
     */
    async getAllServiceApis(serviceId, appId, requestUserId) {
        return new Promise(async (resolve, reject) => {
            try {

                // apis array
                let apis = []

                // Find the apis
                apis = await Api.find({
                    _user: requestUserId,
                    _app: appId,
                    _service: serviceId
                })
                    .select('name opco method end_point time_interval last_status active failed_count')
                    .sort('-created_date') || []

                // Resolve the promise
                resolve(apis)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * 
     * @param {*} method 
     * @param {*} end_point 
     * @param {*} body 
     * @param {*} params 
     * @param {*} headers 
     * @param {*} authorization_via_um 
     * @param {*} opco 
     * @returns 
     */
    async callCustomApi(jobName) {
        return new Promise(async (resolve, reject) => {
            try {

                // Fetch API Details
                await Api.findById(jobName.split('_')[0])
                    .then(async (apiData) => {

                        // Add the runtime headers
                        apiData.headers['Accept'] = '*/*'
                        apiData.headers['Content-Type'] = 'application/json'

                        if (apiData.authorization_via_um == true) {

                            // Fetch the User Token
                            AuthService.loginUserToUserManagement(apiData.opco)
                                .then((tokenData) => {

                                    // Access Token
                                    let accessToken = tokenData.result.accessToken

                                    // Append the Authorization
                                    apiData.headers['Authorization'] = `Bearer ${accessToken}`
                                })
                                .catch((error) => {

                                    // Catch the error and reject the promise
                                    console.error(error)

                                    reject({
                                        error: 'Unable to fetch the Token from User Management, please try again!'
                                    })
                                })
                        }

                        // Prepare the configuration
                        let config = {
                            method: apiData.method,
                            url: apiData.end_point,
                            headers: apiData.headers,
                            data: apiData.body,
                            params: apiData.params,
                            responseType: 'json'
                        }

                        // Record the API response
                        let response = await HelperService.callHttpApi(config)

                        // Set the Last Known Status of the API
                        let last_status = 'unknown'

                        // Update the failed count increment on the basis of response
                        let failed_count_increment = 1

                        if (JSON.stringify(response.status) != JSON.stringify(undefined)) {
                            if (response.status.toString().match(/^4.*$/)) {
                                last_status = 'unhealthy'
                                failed_count_increment = 1
                            } else if (response.status.toString().match(/^5.*$/)) {
                                last_status = 'broken'
                                failed_count_increment = 1
                            } else if (response.status.toString().match(/^2.*$/)) {
                                last_status = 'healthy'
                                failed_count_increment = 0
                            } else {
                                last_status = 'unknown'
                                failed_count_increment = 1
                            }
                        }

                        // Update and Push the response into the API object
                        await Api.findOneAndUpdate({
                            _id: jobName.split('_')[0]
                        }, {
                            $push: {
                                response: {
                                    created_date: moment().format() || '',
                                    code: response.code || 'Success',
                                    status: response.status || 0,
                                    statusText: response.statusText | '',
                                    message: response.message || response.data.message || '',
                                    data: response.data || '{}',
                                    headers: response.headers || '{}',
                                    config: response.config || '{}',
                                    // request: response.request || ''
                                }
                            },
                            $set: {
                                last_run_time: moment().toDate(),
                                last_status: last_status,
                                headers: apiData.headers
                            },
                            $inc: {
                                failed_count: failed_count_increment
                            }
                        }, {
                            new: true
                        })
                            .then(() => {

                                // Resolve the Promise
                                resolve(response.data)
                            })
                            .catch((error) => {

                                // Catch the error and reject the promise
                                console.error(error)

                                reject({
                                    error: 'Unable to update the desired API with Job Response Data!'
                                })
                            })
                    })
                    .catch((error) => {

                        // Catch the error and reject the promise
                        console.error(error)

                        reject({
                            error: error
                        })
                    })

            } catch (error) {

                // Catch the error and reject the promise
                console.error(error)

                reject({
                    error: 'Unable to find the desired API, please try again!'
                })

            }
        })
    }


}

// Export Service
module.exports = ApiService