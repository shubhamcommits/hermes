//importing UserService
const { UserService } = require('../services');
// Send Error
const { SendError } = require('../../utils')


/**
    * Sign-Up Controller
    * @param {*} req 
    * @param {*} res 
    * @param {*} next 
    * @returns 
    */

const UserControllers = {

    async getCurrentUsers(req, res, next) {

        let { userId } = req.params
        try {

            UserService.getUser(userId)
                .then((data) => {

                    // Send Status 200 response
                    if (data.user != null) {
                        return res.status(200).json({
                            message: 'User fetched successfully!',
                            user: data.user
                        })
                    }
                    return res.status(200).json({
                        message: "User not found"
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
module.exports = UserControllers;