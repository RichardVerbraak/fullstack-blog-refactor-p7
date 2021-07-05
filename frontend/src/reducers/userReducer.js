const userListReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case 'GET_USERS_REQUEST':
			return {
				loading: true,
			}

		case 'GET_USERS_SUCCESS':
			return {
				loading: false,
				users: action.payload,
			}

		case 'GET_USERS_FAIL':
			return {
				loading: true,
			}
		default:
			return state
	}
}

const userLoginReducer = (state = { user: {} }, action) => {
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

export { userLoginReducer, userListReducer }
