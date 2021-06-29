const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		minLength: 3,
	},
	name: {
		type: String,
	},
	password: {
		type: String,
		minLength: 3,
	},
	blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id

		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	},
})

userSchema.pre('save', async function (next) {
	// if the password is NOT modified in this Document, continue as usual instead of hashing again
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(this.password, salt)

	// Set password to the hashed password
	this.password = hash
})

const User = mongoose.model('User', userSchema)

module.exports = User
