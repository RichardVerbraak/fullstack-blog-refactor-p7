const userReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case 'USER_LOGIN_REQUEST':
			return {
				loading: true,
			}

		case 'USER_LOGIN_SUCCESS':
			return {
				loading: false,
				user: action.payload,
			}

		case 'USER_LOGIN_ERROR':
			return {
				loading: false,
				error: action.payload,
			}

		case 'USER_LOGOUT':
			return {}
		default:
			return state
	}
}

export default userReducer
