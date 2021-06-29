const jwt = require('jsonwebtoken')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

const getAllBlogs = async (req, res) => {
	const blogs = await Blog.find({}).populate('user', {
		username: 1,
		name: 1,
		id: 1,
	})

	res.send(blogs)
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

const updateBlog = async (req, res, next) => {
	const id = req.params.id
	const { title, author, url, likes } = req.body

	try {
		const blog = await Blog.findById(id)

		blog.title = title || blog.title
		blog.author = author || blog.author
		blog.url = url || blog.url
		blog.likes = likes || blog.likes

		const updatedBlog = await blog.save()

		res.status(202)
		res.send(updatedBlog)
	} catch (error) {
		res.status(400)
		next(error)
	}
}

// const likeBlog = async (req, res, next) => {
// 	try {
// 		const id = req.params.id

// 		const blog = await Blog.findById(id)

// 		const { likes } = req.body

// 		blog.likes = likes || blog.likes

// 		const updatedBlog = await blog.save()

// 		res.status(200)
// 		res.send(updatedBlog)
// 	} catch (error) {
// 		res.status(400)
// 		next(error)
// 	}
// }

module.exports = { getAllBlogs, addNewBlog, deleteBlog, updateBlog }
