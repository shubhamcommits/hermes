// Import Models
const { Auth, User } = require('../models')

// Password Module
const { Password } = require('../../utils')

// JWT Module
const jwt = require('jsonwebtoken')

// Axios Module
const axios = require('axios')

// Moment Module
const moment = require('moment')

// Authentication Service
const AuthService = {

    /**
     * This service is responsible for logging the user into the system(user-management)
     * @param {*} 
     * @returns 
     */
    async loginUserToUserManagement(opco) {
        return new Promise(async (resolve, reject) => {
            try {

                // Prepare the base host name
                let baseHost = `${opco}_BASE_HOST`.toUpperCase()

                // Base port for UM Service
                let basePort = `SERVICE_UM_PORT`

                // Prepare Base URI
                let baseURI = `http://${process.env[`${baseHost}`]}:${process.env[`${basePort}`]}`

                // Auth Data
                const data = {
                    username: process.env.MASTER_USERNAME,
                    password: process.env.MASTER_PASSWORD
                }

                // Hit the response
                await axios.post(`${baseURI}/api/user-mngmnt/v2/login`, data, {
                    headers: {
                        'x-client-id': '2'
                    }
                })
                    .then(async (response) => {
                        if (response.data != undefined && response.data != null) {

                            // Append BASE URI to the result
                            response.data.URL = `http://${process.env[`${baseHost}`]}`

                            // Fetch the res data
                            const res = response.data

                            // Resolve the Promise
                            resolve(res)

                        } else {

                            // Recursively hit the UM Token API
                            await AuthService.loginUserToUserManagement(opco)
                        }
                    })
                    .catch(async () => {

                        // Recursively hit the UM Token API
                        await AuthService.loginUserToUserManagement(opco)
                    })

            } catch (error) {

                // Catch the error and reject the promise
                reject(error.response.data)
            }
        })
    },

    /**
     * This function is responsible for creating the Authentication logs
     * @param {*} token 
     * @param {*} userId 
     * @returns 
     */
    async createAuthLog(token, userId, requestIpAddress) {
        return new Promise(async (resolve, reject) => {
            try {

                // Authentication logs schema
                const authLog = {
                    token: token,
                    _user: userId,
                    ip_address: requestIpAddress || null
                }

                // Create the auth logs
                const auth = await Auth.create(authLog)

                // Resolve the promise
                resolve(auth)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for signing out the user
     * @param {*} userId 
     * @param {*} token 
     * @returns 
     */
    async signOut(userId, token) {
        return new Promise(async (resolve, reject) => {
            try {
                await Auth.findOneAndUpdate({
                    _user: userId,
                    token: token
                }, {
                    $set: {
                        logged_in: false,
                        last_logout: moment().format()
                    }
                }, {
                    new: true
                })

                // Resolve the promise
                resolve({
                    message: "Logged out, successfully!"
                })

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for activating/deactivating the user
     * @param {*} userId 
     * @returns 
     */
    async changeActiveStatus(userId, active) {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await User.findOneAndUpdate({
                    _id: userId
                }, {
                    $set: {
                        active: active
                    }
                }, {
                    new: true
                })

                // Resolve the promise
                resolve({
                    message: "User's active status changed successfully!",
                    user: user
                })

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for signing in the user
     * @param {*} email 
     * @param {*} password 
     * @returns 
     */
    async signIn(email, password, requestIpAddress) {
        return new Promise(async (resolve, reject) => {
            try {

                // Check if user exists in the DB 
                const user = await User.findOne({ email })

                // If user wasn't found or user was previously removed/disabled, return error
                if (!user || user.active === false) {
                    reject({ error: 'Either user doesn\'t exist or was disabled from the system.' })
                }

                // Decrypt the Password
                const decryptedPassword = await Password.decryptPassword(password, user.password)

                // If the password is wrong
                if (!decryptedPassword.password) {
                    reject({ error: 'Please enter a valid email or password!' })
                }

                // Create the signed token
                const token = jwt.sign(user.toJSON(), process.env.JWT_ACCESS_KEY, {
                    expiresIn: process.env.JWT_ACCESS_TIME
                })

                // Log the auths
                this.createAuthLog(token, user._id, requestIpAddress)

                // Resolve the promise
                resolve({
                    user: user,
                    token: token
                })

            } catch (error) {

                console.error(error)

                // Catch the error and reject the promise
                reject(error)
            }
        })
    },

    /**
     * This function is responsible for signing up the user
     * @param {*} userData 
     * @returns 
     */
    async signUp(userData) {
        return new Promise(async (resolve, reject) => {
            try {


                // Check if user exists in the DB 
                const checkUserEmail = await User.findOne({ email: userData.email })
                const checkUserAuuid = await User.findOne({ auuid: userData.auuid })

                if (checkUserAuuid || checkUserEmail) {
                    reject({ error: 'User with this email & auuid combination already exist.' })
                }

                const regForFirstName = '/(^[A-Z])[a-z]{3,60}$/';

                // //Validating password
                // if(!(validation.isLength(userData.password,{min:5}))){
                //     reject({error : 'Password length should be greater than or equal to 5 characters.'})
                //     // console.log("Rejected")
                // } else if(userData.first_name.match(regForFirstName) == null){
                //     reject({error : 'Firstname length should be more than 3 characters and less than 60 characters, and first letter should be in uppercase'})
                //     return
                // } else if(userData.last_name.match(regForFirstName)==null){
                //     reject({error : 'Lastname length should be more than 3 characters and less than 60 characters, and first letter should be in uppercase'})
                //     return
                // } 
                const regForAuuid = '[0-9]{8,8}$';
                // console.log(userData.auuid)
                const id = userData.auuid;
                //   if(!(id.match(regForAuuid))){
                //     reject({error : 'Enter correct auuid'})
                //   }


                // Encrypting user password
                const encryptedPass = await Password.encryptPassword(userData.password)

                // If the password is wrong
                if (!encryptedPass.password) {
                    reject({ error: 'Please choose a different password.' })
                }

                // User Data
                let data = {
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    full_name: userData.first_name + userData.last_name,
                    auuid: userData.auuid,
                    email: userData.email,
                    type: userData.type || 'user',
                    password: encryptedPass.password
                }



                // //need help of shubham here - 
                // const regForEmail =  "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
                // if(!(userData.email.match(regForEmail))){
                //     reject({error : 'Enter a valid email'})
                //     return;
                // }

                // Create the new User
                let user = await User.create(data)
                // console.log(user)
                // If user is not created
                if (!user) {
                    reject({ error: 'User was not created.' })
                }

                // Resolve the promise
                resolve({
                    user: user
                })

            } catch (error) {
                // console.log(error)
                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    }
}

// Export Service
module.exports = AuthService