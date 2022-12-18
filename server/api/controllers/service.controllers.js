// Import Service Service
const { ChildService } = require('../services')

// Send Error
const { SendError } = require('../../utils')

// Service Controllers
const ServiceControllers = {

    /**
     * Create Service Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createService(req, res, next) {
        try {

            // Fetch the data from the request body
            let { name, appId } = req.body

            // Call the Create Service function
            ChildService.createService(name, req.user._id, appId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Service Created Successfully!',
                        service: data
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
     * Get Service Details Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     async getServiceDetails(req, res, next) {
        try {

            // Fetch the data from the request params
            let { serviceId } = req.params

            // Call the Service Function
            ChildService.getServiceDetails(serviceId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Service Details has been fetched successfully!',
                        service: data
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
     * Get Recent Services Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getAllUserServices(req, res, next) {
        try {

            // Fetch the data from the request params
            let { appId } = req.query

            ChildService.getAllUserServices(req.user._id, appId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Services fetched successfully!',
                        services: data
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
     * Remove Service Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     async removeService(req, res, next) {
        try {

            // Fetch the data from the request params
            let { serviceId } = req.params

            // Call the Service Function
            ChildService.removeService(serviceId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'The following Service and it\'s related data has been removed from the system.',
                        service: data
                    })
                })
                .catch((error) => {
                    return res.status(400).json(error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

}

// Export Controllers
module.exports = ServiceControllers