const SendError = (res, err) => {

    // Console the error
    process.stdout.write(`\n⛔️ Error:\n ${err} \n \n`)

    // Return the error
    return res.status(500).json({
        message: 'Internal server error!',
        error: `${err}`
    })
}

// Export Module
module.exports = { SendError }