const app = require('../server')
const supertest = require('supertest')
const mongoose = require('mongoose')

const User = require('../models/userModel')
const { deleteOne } = require('../models/userModel')

const api = supertest(app)

const correctUser = {
	username: 'Bobby',
	name: 'Bobby Hill',
	password: 'bhill123',
}

const invalidUser = {
	username: 'Hank',
	name: 'Ha',
	password: 'hh',
}

beforeEach(async () => {
	await User.deleteMany()
})

test('user will be created', async () => {
	await api.post('/api/users').send(correctUser).expect(201)
})

test('invalid user will not be created', async () => {
	await api
		.post('/api/users')
		.send(invalidUser)
		.expect(400)
		.then((res) => {
			expect(res.body.message).toBe(
				'User validation failed: password: Path `password` (`hh`) is shorter than the minimum allowed length (3).'
			)
		})
})

afterAll(() => {
	mongoose.connection.close()
})
