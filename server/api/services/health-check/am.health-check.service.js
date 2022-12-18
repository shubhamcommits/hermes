// Axios Module
const axios = require('axios')

// Moment Module
const moment = require('moment')

// AMHealthCheckService Service
const AMHealthCheckService = {

    async getBalanceEnquiry(msisdn, opco, baseURI, userToken) {
        return new Promise(async (resolve, reject) => {
            try {

                // Hit the response
                const response = await axios.get(`${baseURI}/api/am-profile/v1/kycrequest`, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'ASP-API-Key': process.env.ASP_API_Key,
                        'ASP-Consumer-Id': process.env.ASP_Consumer_Id,
                        'ASP-Consumer-Txn-Id': process.env.ASP_Consumer_Txn_Id,
                        'ASP-Locale': process.env.ASP_Locale,
                        'ASP-OPCO': opco,
                        'ASP-Req-Timestamp': moment().format()
                    },
                    params: {
                        msisdn: msisdn
                    }
                })

                // Fetch the res data
                const res = response.data

                // Resolve the Promise
                resolve({ status: 'GREEN', data: res })

            } catch (error) {

                console.log(error)

                // Catch the error and reject the promise
                reject({ status: 'ORANGE', error: error })
            }
        })
    }

}

// AMHealthCheckService Service
module.exports = AMHealthCheckService