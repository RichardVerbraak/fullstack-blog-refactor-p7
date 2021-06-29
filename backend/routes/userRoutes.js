const express = require('express')
const {
	createUser,
	getAllUsers,
	loginUser,
} = require('../controllers/userController')

const router = express.Router()

router.get('/', getAllUsers)
router.post('/', createUser)

router.post('/login', loginUser)

module.exports = router
