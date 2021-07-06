const jwt = require('jsonwebtoken')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

// Finds the user and 'replaces' the IDs of the stored blogs with the actual content of said blogs
const getAllBlogs = async (req, res) => {
	// const user = await User.findById(req.user.id).populate('blogs')

	const blogs = await Blog.find({})

	res.send(blogs)
}

const getBlogDetails = async (req, res) => {
	try {
		const blogID = req.params.id

		const blog = await Blog.findById(blogID).populate('user')

		res.status(200)
		res.send(blog)
	} catch (error) {
		res.status(404)
		next(error)
	}
}

// Could refactor the authentication process into it's own middleware
const addNewBlog = async (req, res, next) => {
	try {
		const { title, author, url, likes } = req.body.blog

		const foundUser = req.user

		const blog = await Blog.create({
			title,
			author,
			url,
			likes,
			user: foundUser._id,
		})

		foundUser.blogs = [...foundUser.blogs, blog._id]
		await foundUser.save()

		res.status(201)
		res.send(blog)
	} catch (error) {
		res.status(401)
		next(error)
	}
}

const deleteBlog = async (req, res, next) => {
	try {
		const id = req.params.id

		const blog = await Blog.findById(id)

		const user = req.user

		const decoded = jwt.verify(req.token, process.env.TOKEN_SECRET)

		// Check if the user that created the blog is the same as the token holder
		if (decoded.id === blog.user.toString()) {
			// Delete blog from the user
			user.blogs = user.blogs.filter((blog) => {
				return blog.toString() !== id
			})
			await user.save()

			// Delete blog from Blogs document
			await Blog.findByIdAndDelete(id)

			res.status(200)
			res.json({ message: 'Blog deleted' })
		} else {
			res.status(400)
			res.json({ message: 'Not authorized' })
		}
	} catch (error) {
		res.status(400)
		next(error)
	}
}

const likeBlog = async (req, res, next) => {
	try {
		const id = req.params.id

		const blog = await Blog.findById(id)

		blog.likes = blog.likes + 1

		const updatedBlog = await blog.save()

		res.status(202)
		res.send(updatedBlog)
	} catch (error) {
		res.status(404)
		next(error)
	}
}

const commentBlog = async (req, res, next) => {
	try {
		const id = req.params.id
		const { comment } = req.body

		const blog = await Blog.findById(id)

		blog.comments = [...blog.comments, comment]

		const updatedBlog = await blog.save()

		res.status(202)
		res.send(updatedBlog)
	} catch (error) {
		res.status(500)
		next(error)
	}
}

module.exports = {
	getAllBlogs,
	getBlogDetails,
	addNewBlog,
	deleteBlog,
	likeBlog,
	commentBlog,
}
