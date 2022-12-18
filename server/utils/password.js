// Bcrypt Module
const bcrypt = require('bcryptjs')

// Password Module
const Password = {

    /**
     * This function is responsible for encrypting the password
     * @param {*} password 
     * @returns 
     */
    async encryptPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (error, hashPassword) => {
                if (error) {
                    reject({
                        message: 'Error encrypting password!',
                        error,
                        password
                    })
                } else {
                    resolve({
                        message: 'Password encrypted!',
                        password: hashPassword
                    })
                }
            })
        })
    },

    /**
     * This function is responsible for decrypting the password
     * @param {*} plainPassword 
     * @param {*} hash 
     * @returns 
     */
    async decryptPassword(plainPassword, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainPassword, hash, (hashError, password) => {
                if (hashError) {
                    reject({
                        message: 'Password decryption error!',
                        error: hashError,
                        password
                    })
                } else {
                    resolve({
                        message: 'Password decrypted!',
                        password
                    })
                }
            })
        })
    }
}

// Export Module
module.exports = Password
