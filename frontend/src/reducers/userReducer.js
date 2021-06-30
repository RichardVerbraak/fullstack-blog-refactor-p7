const userReducer = (state = { user: {}, loading: false }, action) => {
	switch (action.type) {
		case 'USER_LOGIN_REQUEST':
			return {
				loading: true,
			}

		case 'USER_LOGIN_SUCCESS':
			return {
				loading: false,
				payload: action.payload,
			}

		case 'USER_LOGIN_ERROR':
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

export default userReducer
