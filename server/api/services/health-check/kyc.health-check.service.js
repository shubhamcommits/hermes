// Axios Module
const axios = require('axios')

// KYCHealthCheckService Service
const KYCHealthCheckService = {

    async fetchKYC(msisdn, baseURI, userToken) {
        return new Promise(async (resolve, reject) => {
            try {

                // Hit the response
                const response = await axios.post(`${baseURI}/api/integration/customer/search`, {
                    msisdn: msisdn
                }, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
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

// KYCHealthCheckService Service
module.exports = KYCHealthCheckService