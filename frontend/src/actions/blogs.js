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

const addNewBlog = (blog, user) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'ADD_BLOG_REQUEST',
			})

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

			dispatch({
				type: 'ADD_BLOG_SUCCESS',
				payload: data,
			})

			// Fetch updated state after adding a blog
			dispatch(getAllBlogs())
		} catch (error) {
			dispatch({
				type: 'ADD_BLOG_ERROR',
				payload: error,
			})
		}
	}
}

const deleteBlog = async (blog, token) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'DELETE_BLOG_REQUEST',
			})

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}

			const { data } = await axios.delete(
				`http://localhost:3003/api/blogs/${blog.id}`,
				config
			)

			dispatch({
				type: 'DELETE_BLOG_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'DELETE_BLOG_FAIL',
				payload: error,
			})
		}
	}
}

const likeBlog = async (blog, token) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'LIKE_BLOG_REQUEST',
			})

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

			dispatch({
				type: 'LIKE_BLOG_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'LIKE_BLOG_FAIL',
				payload: error,
			})
		}
	}
}

export { getAllBlogs, addNewBlog, likeBlog, deleteBlog }
