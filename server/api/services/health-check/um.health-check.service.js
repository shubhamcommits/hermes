// Axios Module
const axios = require('axios')

// UMHealthCheckService Service
const UMHealthCheckService = {

    async getUserByUserName(userName, baseURI, userToken) {
        return new Promise(async (resolve, reject) => {
            try {

                // Hit the response
                const response = await axios.post(`${baseURI}/api/user-mngmnt/v3/user/search`, {}, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    },
                    params: {
                        userName: userName
                    }
                })

                // Fetch the res data
                const res = response.data

                // Resolve the Promise
                resolve({ status: 'GREEN', data: res })

            } catch (error) {

                // Catch the error and reject the promise
                reject({ status: 'ORANGE', error: error })
            }
        })
    }

}

// UMHealthCheckService Service
module.exports = UMHealthCheckService