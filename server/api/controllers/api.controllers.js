// Import Api Service
const { ApiService } = require('../services')

// Send Error
const { SendError } = require('../../utils')

// Api Controllers
const ApiControllers = {

    /**
     * Get Api Details Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     async getApiDetails(req, res, next) {
        try {

            // Fetch the data from the request params
            let { apiId } = req.params

            // Call the Service Function
            ApiService.getApiDetails(apiId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Api Details has been fetched successfully!',
                        api: data
                    })
                })
                .catch((error) => {
                    return res.status(400).json(error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * Remove API Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     async removeApi(req, res, next) {
        try {

            // Fetch the data from the request params
            let { apiId } = req.params

            // Call the Service Function
            ApiService.removeApi(apiId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'The following API and it\'s related data has been removed from the system.',
                        api: data
                    })
                })
                .catch((error) => {
                    return res.status(400).json(error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * Create API Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createApi(req, res, next) {
        try {

            // Fetch the data from the request body
            let { name, method, opco, end_point, authorization_via_um, serviceId, appId } = req.body

            // Call the Create Api function
            ApiService.createApi(name, method, opco, end_point, authorization_via_um, serviceId, appId, req.user._id)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Api Created Successfully!',
                        api: data
                    })
                })
                .catch((error) => {
                    return res.status(400).json(error)
                })
        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * Get Recent Apis Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getAllServiceApis(req, res, next) {
        try {

            // Fetch the data from the request params
            let { serviceId, appId } = req.query

            ApiService.getAllServiceApis(serviceId, appId, req.user._id)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Apis fetched successfully!',
                        apis: data
                    })
                })
                .catch((error) => {
                    return res.status(400).json(error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * Change Active Status Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     async changeActiveStatus(req, res, next) {
        try {

            // Fetch the apiId
            let apiId = req.params.apiId

            // Fetch the status from the body
            let { active, interval } = req.body

            ApiService.changeActiveStatus(apiId, active, interval)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: data.message,
                        status: active,
                        api: data.api
                    })
                })
                .catch((error) => {
                    return res.status(400).json({
                        error: error
                    })
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

}

// Export Controllers
module.exports = ApiControllers