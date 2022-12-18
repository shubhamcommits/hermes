// Path Module
const path = require('path')

// CSV Writer
const createCsvWriter = require('csv-writer').createObjectCsvWriter

// CSV Functions
const csv = {

    /**
     * This function is responsible for generating the CSV
     * @param {*} headers 
     * @param {*} records 
     * @param {*} fileName 
     */
    generateCSV(headers, records, fileName) {

        return new Promise(async (resolve) => {

            // Filename with timestamp
            fileName = `${Date.now()}_${fileName}.csv`

            // CSV Writer
            const csvWriter = createCsvWriter({
                path: path.join(__dirname, `../files/result/${fileName}`),
                header: headers
            })

            // Write records
            await csvWriter.writeRecords(records)

            // Console the Output
            console.log(`FILE - ${fileName} has been generated!`);

            // Resolve Filename
            resolve(`${process.env.FILES_URL}/${fileName}`)
        })
    }
}

// Export Module
module.exports = csv