// Import HealthCheck Service
const { HealthCheck, AuthService } = require('../services')

// HealthCheck Controllers
const HealthCheckControllers = {

    /**
     * This function performs a healthcheck on the user-management base APIs
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async checkUserManagement(req, res, next) {
        try {

            // Fetch the data from the request body
            let { opco, userName } = req.body

            // Login Data from UM Service
            let data = await AuthService.loginUserToUserManagement(opco)

            // Fetch User Token
            let userToken = data.result.accessToken

            // Base port for UM Service
            let basePort = `SERVICE_UM_PORT`

            // Prepare Base URI
            let baseURI = `${data.URL}:${process.env[`${basePort}`]}`

            // Call GET_USER_BY_USERNAME API response
            HealthCheck.UMHealthCheckService.getUserByUserName(userName, baseURI, userToken)
                .then((getUserByUserName) => {

                    // Responses Array
                    const responses = new Array()

                    // Push the result
                    responses.push({ name: 'GET_USER_BY_USERNAME', status: getUserByUserName['status'], method: 'POST' })

                    // Send Status 200 response
                    return res.status(200).json({
                        responses
                    })
                })
                .catch((error) => {

                    // Send Status 400 response
                    return res.status(400).json(error)
                })

        } catch (error) {
            return res.status(500).json({
                status: 'RED',
                error: error
            })
        }
    },

    /**
     * This function performs a healthcheck on the Airtel Money base APIs
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async checkAirtelMoneyService(req, res, next) {
        try {

            // Fetch the data from the request body
            let { opco, msisdn } = req.body

            // Login Data from UM Service
            let data = await AuthService.loginUserToUserManagement(opco)

            // Fetch User Token
            let userToken = data.result.accessToken

            // Base port for AM Service
            let basePort = `SERVICE_AM_PORT`

            // Prepare Base URI
            let baseURI = `${data.URL}:${process.env[`${basePort}`]}`

            // Call GET_BALANCE_ENQUIRY API response
            HealthCheck.AMHealthCheckService.getBalanceEnquiry(msisdn, opco.toUpperCase(), baseURI, userToken)
                .then((getBalanceEnquiry) => {

                    // Responses Array
                    const responses = new Array()

                    // Push the result
                    responses.push({ name: 'GET_BALANCE_ENQUIRY', status: getBalanceEnquiry['status'], method: 'GET' })

                    // Send Status 200 response
                    return res.status(200).json({
                        responses
                    })
                })
                .catch((error) => {

                    // Send Status 400 response
                    return res.status(400).json(error)
                })

        } catch (error) {
            return res.status(500).json({
                status: 'RED',
                error: error
            })
        }
    }
}

// Export Controllers
module.exports = HealthCheckControllers