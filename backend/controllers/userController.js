const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const createUser = async (req, res, next) => {
	try {
		const { username, name, password } = req.body

		const user = await User.create({ username, name, password })

		res.status(201)
		res.send(user)
	} catch (error) {
		res.status(500)
		next(error)
	}
}

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}).populate('blogs', {
			url: 1,
			title: 1,
			author: 1,
			id: 1,
		})

		res.status(200)
		res.send(users)
	} catch (error) {
		res.status(404)
		next(error)
	}
}

const getUserDetails = async (req, res) => {
	try {
		const id = req.params.id

		const user = await User.findById(id)

		console.log(user)

		res.status(200)
		res.send(user)
	} catch (error) {
		res.status(404)
		next(error)
	}
}

const loginUser = async (req, res, next) => {
	try {
		const { username, password } = req.body

		const user = await User.findOne({ username })

		const matchPassword = await bcrypt.compare(password, user.password)

		if (user && matchPassword) {
			const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
				expiresIn: 60 * 60,
			})

			res.status(200)
			res.send({
				id: user.id,
				username: user.username,
				name: user.name,
				token,
			})
		} else {
			res.status(401)
			res.send({ message: 'Wrong username or password' })
		}
	} catch (error) {
		res.status(500)
		next(error)
	}
}

module.exports = { createUser, getAllUsers, getUserDetails, loginUser }
