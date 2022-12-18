// Import App Service
const { AppService } = require('../services')

// Send Error
const { SendError } = require('../../utils')

// App Controllers
const AppControllers = {

    /**
     * Create App Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async createApp(req, res, next) {
        try {

            // Fetch the data from the request body
            let { name, alias } = req.body

            // Call the Create App function
            AppService.createApp(name, alias, req.user._id)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'App Created Successfully!',
                        app: data
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
     * Get Recent Apps Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getAllUserApps(req, res, next) {
        try {

            AppService.getAllUserApps(req.user._id)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Apps fetched successfully!',
                        apps: data
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
     * Remove App Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     async removeApp(req, res, next) {
        try {

            // Fetch the data from the request params
            let { appId } = req.params

            // Call the Service Function
            AppService.removeApp(appId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'The following App and it\'s related data has been removed from the system.',
                        app: data
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
module.exports = AppControllers