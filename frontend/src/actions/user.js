import axios from 'axios'

const loginUser = (user) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'USER_LOGIN_REQUEST',
			})

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'http://localhost:3003/api/users/login',
				user,
				config
			)

			dispatch({
				type: 'USER_LOGIN_SUCCESS',
				payload: data,
			})

			localStorage.setItem('user', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: 'USER_LOGIN_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error,
			})
		}
	}
}

const logoutUser = () => {
	return async (dispatch) => {
		dispatch({
			type: 'USER_LOGOUT',
		})

		localStorage.removeItem('user')
	}
}

const getAllUsers = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'GET_USERS_REQUEST',
			})

			const { data } = await axios.get('http://localhost:3003/api/users/')

			dispatch({
				type: 'GET_USERS_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'GET_USERS_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error,
			})
		}
	}
}

const getUserDetails = (id) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'GET_USER_DETAILS_REQUEST',
			})

			const { data } = await axios.get(`http://localhost:3003/api/users/${id}`)

			dispatch({
				type: 'GET_USER_DETAILS_SUCCESS',
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: 'GET_USER_DETAILS_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error,
			})
		}
	}
}

export { getAllUsers, loginUser, logoutUser, getUserDetails }
