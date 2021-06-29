const express = require('express')
const {
	getAllBlogs,
	addNewBlog,
	deleteBlog,
	updateBlog,
} = require('../controllers/blogControllers')

const userExtractor = require('../middleware/userMiddleware')

const router = express.Router()

router.get('/', getAllBlogs)

router.post('/', userExtractor, addNewBlog)

router.delete('/:id', userExtractor, deleteBlog)

router.put('/:id', userExtractor, updateBlog)

module.exports = router
