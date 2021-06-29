const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

// Use test DB if environment is set to test
const MONGO_URI =
	process.env.NODE_ENV === 'test'
		? process.env.TEST_MONGO_URI
		: process.env.MONGO_URI

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})

		if (process.env.NODE_ENV === 'development') console.log('connected')
	} catch (error) {
		if (process.env.NODE_ENV === 'development') console.error(error)
	}
}

module.exports = connectDB
