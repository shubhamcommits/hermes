// Axios Module
const axios = require('axios')

// File Stream Promises Module
const fs = require('fs').promises

// File Stream Module
const fileStream = require('fs')

// Path Module
const path = require('path')

// Moment Module
const moment = require('moment')

// Form Data Module
const FormData = require('form-data')

// Hit curl
const { curly } = require('node-libcurl')

// Import Sales Portal Service
const AuthService = require('./auth.service')

// Sales Compass Service
const SalesCompassService = {

    async processUserFile(opco, fileName) {
        return new Promise(async (resolve, reject) => {
            try {

                // Fetch the User Token
                let tokenData = await AuthService.loginUserToUserManagement(opco)

                // Base port for UM Service
                let basePort = `SERVICE_SALES_PORT`

                // Prepare Base URI
                let baseURI = `${tokenData.URL}:${process.env[`${basePort}`]}`

                console.log(`\n ============================================ \n`)

                console.log(`File -  ${fileName} is getting processed ...`)

                console.log(`\n ============================================ \n`)

                // Read the file
                const file = await fs.readFile(path.join(__dirname, `../../files/staging/${fileName}`))

                // New Form Data Class
                const form = new FormData()

                // Append to Form Data
                form.append('file', file, fileName)

                // Hit the response
                const response = await axios.post(`${baseURI}/api/sales-person/upload-sales-users`, form, {
                    headers: {
                        ...form.getHeaders(),
                        'Authorization': `Bearer ${tokenData.result.accessToken}`
                    }
                })
                    .catch((error) => {
                        console.log('Error', error)
                    })

                console.log(`\n ============================================ \n`)

                console.log(`File -  ${fileName} is ingested into the system ...`)

                console.log(`\n ============================================ \n`)

                // Fetch the res data
                const res = response.data

                const fileURl = `${baseURI}/${res.result.content.replace('/spm', 'api')}`

                // Fetch the system time stamp
                let currentMoment = moment().valueOf()

                const { data } = await curly.post(fileURl, {
                    postFields: JSON.stringify({ opcoCode: opco }),
                    httpHeader: [
                        'Content-Type: application/json',
                        'Accept: */*',
                        'Authorization: Bearer ' + tokenData.result.accessToken
                    ],
                })

                // Download the output and save it to the result folder
                let output = await this.downloadOutputFile({
                    fileUrl: fileURl,
                    opcoCode: opco,
                    fileName: path.join(__dirname, `../../files/result/${currentMoment}_output_${fileName}`),
                    // userToken: tokenData.result.accessToken
                })

                // Move the file to processed folder
                await fs.rename(path.join(__dirname, `../../files/staging/${fileName}`), path.join(__dirname, `../../files/processed/${currentMoment}_${fileName}`))

                console.log(`\n ============================================ \n`)

                console.log(`Output of the File -  ${fileName} is ready!`)

                console.log(`\n ============================================ \n`)

                // Resolve the Promise
                resolve(output)

            } catch (error) {

                // Catch the error and reject the promise
                reject(error)
            }
        })
    },

    async downloadOutputFile({ fileUrl, opcoCode, fileName }) {
        return new Promise(async (resolve, reject) => {
            try {

                // Fetch the User Token
                let tokenData = await AuthService.loginUserToUserManagement(opcoCode)

                const { data } = await curly.post(fileUrl, {
                    postFields: JSON.stringify({ opcoCode: opcoCode }),
                    httpHeader: [
                        'Content-Type: application/json',
                        'Accept: */*',
                        'Authorization: Bearer ' + tokenData.result.accessToken
                    ],
                })

                // Hit the response
                const response = await axios.post(fileUrl, { opcoCode: opcoCode }, {
                    headers: {
                        'Authorization': `Bearer ${tokenData.result.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (JSON.stringify(response['data']) != JSON.stringify(undefined)) {

                    // Base64 Code for File
                    const result = response

                    // Create a buffer from the bitmap
                    const bitmap = Buffer.from(result.data.result, result, 'base64')

                    // Write the output file
                    fileStream.writeFileSync(fileName, bitmap)

                    console.log(`\n ============================================ \n`)

                    console.log(`Output File is saved -  ${fileName}`)

                    console.log(`\n ============================================ \n`)

                    // Resolve the promise
                    resolve('Output file is ready!')

                } else {
                    resolve('Unable to download the file!')
                }

            } catch (error) {

                // Catch the error and reject the promise
                reject(error)

            }
        })
    },

    async processAllFiles(opco) {
        return new Promise(async (resolve, reject) => {
            try {

                // Files Data
                let files = await new Promise((resolve, reject) => {
                    return fileStream.readdir(path.join(__dirname, '../../files/staging'), (err, filenames) => err != null ? reject(err) : resolve(filenames))
                })

                console.log('Directory list', files)

                if (files.length > 0) {
                    for (let index = 0; index < files.length; index++) {

                        // Fetch the reponse the API
                        let response = await SalesCompassService.processUserFile(opco, files[index])

                        // Append the filename to the response object
                        response.file = files[index]

                        // Add the object to the array
                        files[index] = response
                    }
                }

                resolve('Files have been processed!')

            } catch (error) {

                // Catch the error and reject the promise
                reject(error)
            }
        })
    }

}

// Export Service
module.exports = SalesCompassService