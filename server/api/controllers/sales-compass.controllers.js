// File Stream Module
const fs = require('fs')

// Path Module
const path = require("path")

// Import Sales Portal Service
const { AuthService, SalesCompassService } = require('../services')

// Form Data Module
const FormData = require('form-data')

// Send Error
const { SendError } = require('../../utils')

// Sales Portal Controllers
const SalesPortalControllers = {

    /**
     * Sales Login Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async loginUserToSalesPortal(req, res, next) {
        try {

            // Call the login to user management function
            AuthService.loginUserToUserManagement()
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Token from User Management fetched successfully!',
                        token: data.result.accessToken
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

    async processUserFiles(req, res, next) {
        try {

            // Fetch OPCO
            let { opco } = req.query

            // Trigger all the files synchronously
            SalesCompassService.processAllFiles(opco)

            // Send Status 200 response
            return res.status(200).json({
                message: 'Files have been processed successfully!'
            })
        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async stopProcessInterval(req, res, next) {
        try {

            // Call to stop the Interval
            clearInterval(req.body.processId)

            return res.status(200).json({
                message: 'Process has been stopped!'
            })

        } catch (error) {
            return SendError(res, error)
        }
    },
}

// Export Controllers
module.exports = SalesPortalControllers