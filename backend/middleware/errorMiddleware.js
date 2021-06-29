const errorHandler = (error, req, res, next) => {
	// Sets status to 500 if it somehow sets status to a 200, else set it to the status set in the response
	const errorStatus = res.statusCode === 200 ? 500 : res.statusCode

	// Set the status to the error code we made (convert 200 to 500 for reasons above)
	res.status(errorStatus)

	console.log(error.message)

	// Send error message back
	res.json({
		message: error.message,
	})
}

module.exports = errorHandler
