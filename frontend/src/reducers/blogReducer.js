const blogListReducer = (state = { blogs: [] }, action) => {
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

const blogDetailsReducer = (state = { blog: {} }, action) => {
	switch (action.type) {
		case 'GET_BLOG_DETAILS_REQUEST':
			return {
				loading: true,
			}

		case 'GET_BLOG_DETAILS_SUCCESS':
			return {
				loading: false,
				blog: action.payload,
			}

		case 'GET_BLOG_DETAILS_FAIL':
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

const addBlogReducer = (state = {}, action) => {
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

const likeBlogReducer = (state = {}, action) => {
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

const deleteBlogReducer = (state = {}, action) => {
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

export {
	blogListReducer,
	blogDetailsReducer,
	addBlogReducer,
	likeBlogReducer,
	deleteBlogReducer,
}
