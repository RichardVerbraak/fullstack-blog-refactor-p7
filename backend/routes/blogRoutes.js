const express = require('express')
const {
	getAllBlogs,
	getBlogDetails,
	addNewBlog,
	deleteBlog,
	updateBlog,
} = require('../controllers/blogControllers')

const userExtractor = require('../middleware/userMiddleware')

const router = express.Router()

router.get('/', userExtractor, getAllBlogs)

router.post('/', userExtractor, addNewBlog)

router.get('/:id', userExtractor, getBlogDetails)

router.delete('/:id', userExtractor, deleteBlog)

router.put('/:id', userExtractor, updateBlog)

module.exports = router
