const blogListReducer = (state = { blogs: [], loading: false }, action) => {
	switch (action.type) {
		case 'GET_BLOGS_REQUEST':
			return {
				loading: true,
			}

		case 'GET_BLOGS_SUCCESS':
			return {
				loading: false,
				blogs: action.payload,
			}

		case 'GET_BLOGS_FAIL':
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

const addBlogReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case 'ADD_BLOG_REQUEST':
			return {
				loading: true,
			}

		case 'ADD_BLOG_SUCCESS':
			return {
				loading: false,
			}

		case 'ADD_BLOG_FAIL':
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

const likeBlogReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case 'LIKE_BLOG_REQUEST':
			return {
				loading: true,
			}

		case 'LIKE_BLOG_SUCCESS':
			return {
				loading: false,
			}

		case 'LIKE_BLOG_FAIL':
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

const deleteBlogReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case 'DELETE_BLOG_REQUEST':
			console.log(action.type)
			return {
				loading: true,
			}

		case 'DELETE_BLOG_SUCCESS':
			return {
				loading: false,
			}

		case 'DELETE_BLOG_FAIL':
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

export { blogListReducer, addBlogReducer, likeBlogReducer, deleteBlogReducer }
