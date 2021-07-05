import axios from 'axios'

const getAllBlogs = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'GET_BLOGS_REQUEST',
			})

			const {
				userLogin: { user },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
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
			dispatch({
				type: 'GET_BLOGS_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error,
			})
		}
	}
}

const getBlogDetails = (id) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'GET_BLOG_DETAILS_REQUEST',
			})

			const { userLogin: user } = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			}

			const { data } = await axios.get(
				`http://localhost:3003/api/blogs/${id}`,
				config
			)

			dispatch({
				type: 'GET_BLOG_DETAILS_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'GET_BLOG_DETAILS_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error,
			})
		}
	}
}

const addNewBlog = (blog) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'ADD_BLOG_REQUEST',
			})

			const {
				userLogin: { user },
			} = getState()

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
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error,
			})
		}
	}
}

const deleteBlog = (blog) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'DELETE_BLOG_REQUEST',
			})

			const {
				userLogin: { user },
			} = getState()

			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
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

			dispatch(getAllBlogs())
		} catch (error) {
			dispatch({
				type: 'DELETE_BLOG_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error,
			})
		}
	}
}

const likeBlog = (blog) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: 'LIKE_BLOG_REQUEST',
			})

			const {
				userLogin: { user },
			} = getState()

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
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

			// Use optimistic update
			console.log(data)

			dispatch({
				type: 'LIKE_BLOG_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'LIKE_BLOG_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error,
			})
		}
	}
}

export { getAllBlogs, getBlogDetails, addNewBlog, likeBlog, deleteBlog }
