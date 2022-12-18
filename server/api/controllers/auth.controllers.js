// Import Auth Service
const { AuthService } = require('../services')

// Send Error
const { SendError } = require('../../utils')

// Auth Controllers
const AuthControllers = {

    /**
     * Sign-In Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async signIn(req, res, next) {
        try {

            // Fetch the data from the request body
            let { email, password } = req.body

            // Request IP Address
            let requestIpAddress = req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress ||
                (req.headers['x-forwarded-for'] || '').split(',')[0] ||
                null;

            // call the signIn function
            AuthService.signIn(email, password, requestIpAddress)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User signed In Successfully!',
                        user: data.user,
                        token: data.token
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

    /**
     * Sign-Up Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async signUp(req, res, next) {
       
        try {

            // Fetch the data from the request body
            const user = req.body
            

            // Call the signUp function
            AuthService.signUp(user)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User signed up successfully!',
                        user: data.user
                    })
                })
                .catch((error) => {
                    console.log(error)
                    return res.status(400).json(error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * Sign-Out Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async signOut(req, res, next) {
        try {

            // Fetch the UserId
            let userId = req.user._id

            // Fetch the token from headers
            let token = req.headers.authorization.split(' ')[1]

            AuthService.signOut(userId, token)
                .then((data) => {

                    // Unset the user
                    req.user = null

                    // Send Status 200 response
                    return res.status(200).json({
                        message: data.message
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

    /**
     * Change Active Status Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
     async changeActiveStatus(req, res, next) {
        try {

            // Fetch the UserId
            let userId = req.params.userId

            // Fetch the status from query
            let status = req.query.active

            // Check if passed userId is equals to the currently loggedIn user
            if(req.user._id == userId){
                return res.status(400).json({
                    error: "User can not change their own status, please ask one of the other admins/super-admins to do the needful!"
                })
            }

            AuthService.changeActiveStatus(userId, status)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: data.message,
                        status: status,
                        user: data.user
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

    /**
     * This function is responsible for fetching the token from User Management
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async loginToUserManagement(req, res, next) {
        try {

            // Fetch the UserId
            let opco = req.headers.opco

            // If OPCO code is not present in the headers
            if(!opco)
                return res.status(400).json({
                    message: "Opco Code is not present in the Header, please do the needful!"
                })

            // Call Login User Management Service
            AuthService.loginUserToUserManagement(opco)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Token from User Management fetched successfully!',
                        url: data.URL,
                        opco: opco,
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
    }
}

// Export Controllers
module.exports = AuthControllers