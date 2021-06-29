import axios from 'axios'
// const baseUrl = '/api/blogs'

const getAllBlogs = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const { data } = await axios.get('http://localhost:3003/api/blogs', config)

	return data
}

const addNewBlog = async (blog, user) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${user.token}`,
		},
	}

	const { data } = await axios.post(
		'http://localhost:3003/api/blogs',
		{ blog, user },
		config
	)

	return data
}

const deleteBlog = async (blog, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const { data } = await axios.delete(
		`http://localhost:3003/api/blogs/${blog.id}`,
		config
	)

	return data
}

const likeBlog = async (blog, token) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}

	const updatedBlog = {
		likes: blog.likes + 1,
	}

	const { data } = await axios.put(
		`http://localhost:3003/api/blogs/${blog.id}`,
		updatedBlog,
		config
	)

	return data
}

export { getAllBlogs, addNewBlog, likeBlog, deleteBlog }
