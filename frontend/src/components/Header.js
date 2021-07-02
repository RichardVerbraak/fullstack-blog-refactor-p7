import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/user'

const Header = () => {
	const dispatch = useDispatch()

	const logout = () => {
		dispatch(logoutUser())
	}

	const userReducer = useSelector((state) => {
		return state.userInfo
	})
	const { user } = userReducer

	return (
		<div>
			<h2>Blogs</h2>
			<div>
				<p>
					{user && user.name} logged in{' '}
					<span>
						<button onClick={logout}>Logout</button>
					</span>
				</p>
			</div>
		</div>
	)
}

export default Header
