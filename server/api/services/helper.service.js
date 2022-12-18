// Axios Module
const axios = require('axios')

// Helper Service
const HelperService = {

    /**
     * This function is responsible for calling the custom Http API
     * @param {*} config 
     * @returns 
     */
    async callHttpApi(config) {
        return new Promise(async (resolve) => {

            // Record the API response
            axios(config)
                .then((response) => {

                    // Resolve the Promise
                    resolve(response)

                },
                    (error) => {

                        // Resolve the Promise
                        resolve(error)
                    })
        })
    }

}

// Export Service
module.exports = HelperService