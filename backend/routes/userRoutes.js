const express = require('express')
const {
	createUser,
	getAllUsers,
	loginUser,
	getUserDetails,
} = require('../controllers/userController')

const router = express.Router()

router.get('/', getAllUsers)
router.post('/', createUser)

router.get('/:id', getUserDetails)
router.post('/login', loginUser)

module.exports = router
