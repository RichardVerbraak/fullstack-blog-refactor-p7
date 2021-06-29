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

export { blogListReducer, addBlogReducer }
