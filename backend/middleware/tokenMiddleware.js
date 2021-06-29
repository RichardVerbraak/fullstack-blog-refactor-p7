const tokenExtractor = (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		req.token = req.headers.authorization.split(' ')[1]
	}

	next()
}

module.exports = tokenExtractor
