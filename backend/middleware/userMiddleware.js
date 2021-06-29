const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const userExtractor = async (req, res, next) => {
	try {
		const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET)

		req.user = await User.findById(decoded.id)

		next()
	} catch (error) {
		next(error)
	}
}

module.exports = userExtractor
