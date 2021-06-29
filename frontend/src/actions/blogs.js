import axios from 'axios'

const getAllBlogs = (token) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'GET_BLOGS_REQUEST',
			})

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}

			const { data } = await axios.get(
				'http://localhost:3003/api/blogs',
				config
			)

			dispatch({
				type: 'GET_BLOGS_SUCCESS',
				payload: data,
			})
		} catch (error) {
			console.log(error)
			dispatch({
				type: 'GET_BLOGS_FAIL',
				payload: error,
			})
		}
	}
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
