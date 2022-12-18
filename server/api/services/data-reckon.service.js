// MongoDB Client Module
const { MongoClient } = require('mongodb')

// Axios Module
const axios = require('axios')

// Data Reckon Service
const DataReckonService = {

    /**
     * This function is responsible for creating a DB Client
     * @param {*} url 
     * @returns 
     */
    async connectDBClient(url) {
        return new Promise(async (resolve) => {

            // Initialise the client
            const client = new MongoClient(url, { useUnifiedTopology: true })

            // Make the connection
            let connection = await client.connect()

            // Resolve the client
            resolve(connection)
        })
    },

    /**
     * This function is responsible for closing the DB Client
     * @param {*} url 
     * @returns 
     */
    async disconnectDBClient(client) {
        return new Promise(async (resolve) => {

            // Close the connection
            let connection = await client.close()

            // Resolve the client
            resolve(connection)
        })
    },

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
            // try {

            //     let response = await axios(config)

            //     console.log('response', response)

            //     // Record the API response
            //     axios(config)
            //         .then((response) => {

            //             console.log('response', response)

            //             // Resolve the Promise
            //             resolve(response)

            //         })
            //         .catch((response) => {

            //             console.log('response', response)

            //             // Resolve the Promise
            //             reject(response)
            //         })

            //     // Resolve the Promise
            //     resolve(response)

            // } catch (error) {

            //     if (error.response) {
            //         // The request was made and the server responded with a status code
            //         // that falls out of the range of 2xx
            //         console.log(error.response.data);
            //         console.log(error.response.status);
            //         console.log(error.response.headers);

            //         // Resolve the failed response
            //         reject(error.response)
            //     } else if (error.request) {
            //         // The request was made but no response was received
            //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //         // http.ClientRequest in node.js
            //         console.log(error.request)
            //         // Resolve the failed response
            //         reject(error.request)
            //     } else {
            //         // Something happened in setting up the request that triggered an Error
            //         console.log('Error', error.message);

            //         // Resolve the failed response
            //         reject(error.message)
            //     }
            //     console.log(error.config)
            // }


        })
    },

    /**
     * This function is responsible for fetching all the collections from the DB
     * @param {*} url 
     * @param {*} dbName 
     * @returns 
     */
    async getAllCollections(url, dbName) {
        return new Promise(async (resolve, reject) => {
            try {

                // Connect the client
                let client = await DataReckonService.connectDBClient(url)

                // Fetch the collections
                let collections = client.db(dbName).listCollections().toArray()

                // Resolve the collections
                resolve(collections)

            } catch (error) {

                // Reject the promise
                reject([])
            }
        })
    },

    async getCollectionDataByStatus(url, dbName, collectionName, status, startDate, endDate) {
        return new Promise(async (resolve, reject) => {
            try {

                // Connect the client
                let client = await DataReckonService.connectDBClient(url)

                // Fetch the data
                let data = client.db(dbName)
                    .collection(collectionName)
                    .aggregate([
                        {
                            $match: {
                                $and: [
                                    { createdDate: { $gte: new Date((new Date(startDate).getTime())) } },
                                    { createdDate: { $lt: new Date((new Date(endDate).getTime())) } },
                                    { status: status }
                                ]
                            }
                        },
                        {
                            $project: {
                                year: { $year: "$createdDate" },
                                month: { $month: "$createdDate" },
                                day: { $dayOfMonth: "$createdDate" },
                                week: { $floor: { $divide: [{ $dayOfMonth: "$createdDate" }, 7] } }
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    year: "$year",
                                    month: "$month",
                                    day: "$day",
                                    week: "$week",
                                },
                                count: { $sum: 1 }
                            }
                        },
                        {
                            $sort: {
                                "_id.year": 1,
                                "_id.month": 1,
                                "_id.day": 1,
                                "_id.week": 1
                            }
                        }
                    ])
                    .toArray()

                // Setting the promise and resolving it
                data = await data

                // Mapping the data
                data = data.map((elem) => {
                    return {
                        year: elem._id.year,
                        month: elem._id.month,
                        week: elem._id.week,
                        count: elem.count,
                        status: status
                    }
                })

                // Resolve the data
                resolve(data)

            } catch (error) {

                console.log(error)

                // Reject the promise
                reject([])
            }
        })
    },

    /**
     * 
     * @param {*} url 
     * @param {*} dbName 
     * @param {*} collectionName 
     * @returns 
     */
    async getDistinctCPRoles(url, dbName, collectionName) {
        return new Promise(async (resolve, reject) => {
            try {

                // Connect the client
                let client = await DataReckonService.connectDBClient(url)

                // Fetch the data
                let data = await client.db(dbName)
                    .collection(collectionName)
                    .distinct('discriminator.resourceDiscriminator', { 'discriminator.existing': 'true' })

                // Resolve the data
                resolve(data)

            } catch (error) {

                // Reject the promise
                reject(error)
            }
        })
    },

    /**
     * This function is responsible for fetching the resource configuration from FieldMapping from the DB
     * @param {*} url 
     * @param {*} dbName 
     * @returns 
     */
    async getBulkUploadCollectionFields(url, dbName, collectionName, profileName, existing) {
        return new Promise(async (resolve, reject) => {
            try {

                // Connect the client
                let client = await DataReckonService.connectDBClient(url)
                    .catch(() => {

                        // Reject the promise
                        reject('Unable to create the DB connection!')
                    })

                // Fetch the data
                let data = client.db(dbName)
                    .collection(collectionName)
                    .find(
                        {
                            'discriminator.resourceDiscriminator': profileName,
                            'discriminator.existing': existing
                        })
                    .project({ 'fieldMapping.index': 1, 'fieldMapping.fileHeaderName': 1, 'fieldMapping.skipForRoles': 1, 'fieldMapping.notMandatoryForRoles': 1 })
                    .toArray()

                // Setting the promise and resolving it
                data = await data

                // Indeces To Be Removed
                let indecesToBeRemoved = []
                let nonMandatoryFields = []

                // Append the skipForRoles and notMandatoryForRoles indeces from the array
                if (data[0]['fieldMapping'].length > 0) {
                    for (let index = 0; index < data[0]['fieldMapping'].length; index++) {
                        if (data[0]['fieldMapping'][index].hasOwnProperty('skipForRoles') == true) {
                            if (data[0]['fieldMapping'][index]['skipForRoles'].includes(profileName)) {
                                indecesToBeRemoved.indexOf(index) === -1 ? indecesToBeRemoved.push(index) : console.log('This index already exists')
                            }
                        }
                        if (data[0]['fieldMapping'][index].hasOwnProperty('notMandatoryForRoles') == true) {
                            if (!data[0]['fieldMapping'][index]['notMandatoryForRoles'].includes(profileName)) {
                                indecesToBeRemoved.indexOf(index) === -1 ? indecesToBeRemoved.push(index) : console.log('This index already exists')
                            }
                        }
                    }
                }

                // Splice the not mandatory indeces
                if (indecesToBeRemoved.length > 0) {
                    for (let index = 0; index < indecesToBeRemoved.length; index++) {
                        let dataIndex = data[0]['fieldMapping'].findIndex((elem) => elem['index'] == indecesToBeRemoved[index])
                        if (dataIndex != -1) {
                            nonMandatoryFields.push(data[0]['fieldMapping'][dataIndex])
                            data[0]['fieldMapping'][dataIndex].type = 'non-mandatory'
                            // data[0]['fieldMapping'].splice(dataIndex, 1)
                        }

                    }
                }

                // Resolve the data
                resolve({ all: data, nonMandatory: nonMandatoryFields })

            } catch (error) {

                // Reject the promise
                reject(error)
            }
        })
    },

    async jsonAnamolyDetection(base_json, reference_json) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = {}
                if (Object.is(base_json, reference_json)) {
                    return undefined;
                }
                if (!reference_json || typeof reference_json !== 'object') {
                    return reference_json;
                }
                Object.keys(base_json || {}).concat(Object.keys(reference_json || {})).forEach(key => {
                    if (reference_json[key] !== base_json[key] && !Object.is(base_json[key], reference_json[key])) {
                        result[key] = reference_json[key];
                    }
                    if (typeof reference_json[key] === 'object' && typeof base_json[key] === 'object') {
                        const value = diff(base_json[key], reference_json[key]);
                        if (value !== undefined) {
                            result[key] = value;
                        }
                    }
                })
                return resolve(result)

            } catch (error) {

                // Reject the promise
                reject(error)
            }
        })
    }

}

// Export Service
module.exports = DataReckonService