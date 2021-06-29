const blogReducer = (state = { blogs: [], loading: false }, action) => {
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
				blogs: action.payload,
			}

		default:
			return state
	}
}

export default blogReducer
