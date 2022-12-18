// Import Job Service
const { JobService } = require('../services')

// Send Error
const { SendError } = require('../../utils')

// Job Controllers
const JobControllers = {

    /**
     * Start Job Processor
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async startJobProcessor(req, res, next) {
        try {

            // Call the startJobProcessor function
            JobService.startJobProcessor()
                .then(() => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Job and Agenda are working as expected!'
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
module.exports = JobControllers