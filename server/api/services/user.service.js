const { User } = require('../models')

const UserService = {

    async getUser(userId) {
        return new Promise(async (resolve, reject) => {
            try {

                // fetch user
                const Currentuser = await User.findOne({
                    auuid: userId
                })
               //resolving the promise
                resolve({user : Currentuser});
                
                

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: "User not found, Please enter correct id" })
            }
        })
    },




}

//Exporting this service
module.exports = UserService;