// Import Data Reckon Service
const { DataReckonService } = require('../services')

// CSV Module
const { CSV } = require('../../utils')

// Data Reckon Controllers
const DataReckonControllers = {

    /**
     * Get All Collections Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async getAllCollections(req, res, next) {
        try {

            // Fetch OPCO, Database Name and Environment
            let { opco, dbName, env } = req.query

            // Prepare the environment name
            let DB_URL = `A_${dbName}_${opco}_${env}_DB_URI`.toUpperCase()

            // Get all the collections
            DataReckonService.getAllCollections(process.env[`${DB_URL}`], dbName)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: `All the collections for ${dbName} has been fetched!`,
                        collections: data
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

    async getCollectionDataByStatus(req, res, next) {
        try {

            // Fetch OPCO, Database Name and Environment
            let { opco, dbName, env, collectionName, status, startDate, endDate, file } = req.query

            // Prepare the environment name
            let DB_URL = `A_${dbName}_${opco}_${env}_DB_URI`.toUpperCase()

            // Get all the collections
            DataReckonService.getCollectionDataByStatus(process.env[`${DB_URL}`], dbName, collectionName, status, startDate, endDate)
                .then(async (data) => {

                    if (file == 'true') {

                        // Map the headers
                        let headers = Object.keys(data[0]).map((elem) => {
                            return {
                                id: elem,
                                title: elem
                            }
                        })

                        // File name 
                        let fileName = `${opco}-${dbName}-${env}_${collectionName}-${status}`

                        // Generate CSV
                        fileName = await CSV.generateCSV(headers, data, fileName)

                        // Send Status 200 response
                        return res.status(200).json({
                            message: `Data for ${opco}-${dbName}-${env} has been fetched!`,
                            file: fileName,
                            info: `Status: ${status} & Start Date: ${startDate} & End Date: ${endDate}`,
                            data: data
                        })
                    } else {

                        // Send Status 200 response
                        return res.status(200).json({
                            message: `Data for ${opco}-${dbName}-${env} has been fetched!`,
                            info: `Status: ${status} & Start Date: ${startDate} & End Date: ${endDate}`,
                            data: data
                        })
                    }

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

    async getDistinctCPRoles(req, res, next) {
        try {

            // Fetch OPCO, Database Name and Environment
            let { opco, dbName, env, collectionName } = req.query

            // Prepare the environment name
            let DB_URL = `A_${dbName}_${opco}_${env}_DB_URI`.toUpperCase()

            DataReckonService.getDistinctCPRoles(process.env[`${DB_URL}`], dbName, collectionName)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: `CP Roles for ${opco}-${dbName}-${env} has been fetched!`,
                        roles: data
                    })
                })
                .catch((error) => {
                    return res.status(400).json({
                        error: JSON.stringify(error)
                    })
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

    async getBulkUploadCollectionFields(req, res, next) {
        try {

            // Fetch OPCO, Database Name and Environment
            let { opco, dbName, env, collectionName, profileName, existing, file } = req.query

            // Prepare the environment name
            let DB_URL = `A_${dbName}_${opco}_${env}_DB_URI`.toUpperCase()

            // Get all the collections
            DataReckonService.getBulkUploadCollectionFields(process.env[`${DB_URL}`], dbName, collectionName, profileName, existing)
                .then(async (data) => {

                    if(data['all'].length == 0){
                        return res.status(400).json({
                            error: "We don't have sufficient data for this profile, please try with a different one!"
                        })
                    }

                    if (file == 'true') {

                        // Map the headers
                        if (data['all'][0].hasOwnProperty('fieldMapping')) {

                            let headers = data['all'][0]['fieldMapping'].map((elem) => {
                                return {
                                    id: elem.fileHeaderName,
                                    title: elem.fileHeaderName
                                }
                            })

                            // File name 
                            let fileName = `${profileName}-${opco}-${dbName}-${env}_${collectionName}`

                            let dataObject = data['all'][0]['fieldMapping']
                                .reduce((acc, cur) => (
                                    {
                                        ...acc, [cur.fileHeaderName]: ((cur.type) ? cur.type : 'mandatory')
                                    }), {})

                            // Generate CSV
                            fileName = await CSV.generateCSV(headers, [dataObject], fileName)

                            // Send Status 200 response
                            return res.status(200).json({
                                message: `Data fields for ${opco}-${dbName}-${env} has been fetched!`,
                                profile: profileName,
                                file: fileName,
                                totalFields: data['all'][0]['fieldMapping'].length,
                                nonMandatory: (data['nonMandatory'].length > 0) ? data['nonMandatory'].map(elem => elem.fileHeaderName) : [],
                                all: data['all'][0]['fieldMapping'].map(elem => elem.fileHeaderName)
                            })
                        } else {
                            return res.status(400).json({
                                error: 'Unable to find the field mapping for this profile, please try with a different one!'
                            })
                        }


                    } else {

                        // Send Status 200 response
                        return res.status(200).json({
                            message: `Data fields for ${opco}-${dbName}-${env} has been fetched!`,
                            profile: profileName,
                            totalFields: data['all'][0]['fieldMapping'].length + data['nonMandatory'].length,
                            nonMandatory: (data['nonMandatory'].length > 0) ? data['nonMandatory'].map(elem => elem.fileHeaderName) : [],
                            all: data['all'][0]['fieldMapping'].map(elem => elem.fileHeaderName)
                        })
                    }

                })
                .catch((error) => {
                    return res.status(400).json({
                        error: JSON.stringify(error)
                    })
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

    async jsonAnamolyDetection(req, res, next) {
        try {

            // Fetch BaseJSON and ReferenceJSON
            let { base_json, reference_json } = req.body

            DataReckonService.jsonAnamolyDetection(base_json, reference_json)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: `Difference b/w JSON(s) has been fetched`,
                        result: data
                    })
                })
                .catch((error) => {
                    return res.status(400).json({
                        error: JSON.stringify(error)
                    })
                })

        } catch (error) {
            return SendError(res, error)
        }
    },
}

// Export Controllers
module.exports = DataReckonControllers