const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, currentBlog) => {
		return sum + currentBlog.likes
	}, 0)
}

const favoriteBlog = (blogs) => {
	const likesArray = blogs.map((blog) => {
		return blog.likes
	})

	return Math.max(...likesArray)
}

const mostBlogs = () => {
	const blogs = [
		{
			title: 'At the Mountains of Madness',
			author: 'H.P. Lovecraft',
			url: 'something.something.com',
			likes: 4,
		},
		{
			title: 'Dagon',
			author: 'H.P. Lovecraft',
			url: 'something.something.com',
			likes: 6,
		},
		{
			title: 'Baptism of Fire',
			author: 'Andrzej Sapkowski',
			url: 'something.something.com',
			likes: 10,
		},
	]
}

mostBlogs()

module.exports = { dummy, totalLikes, favoriteBlog }
