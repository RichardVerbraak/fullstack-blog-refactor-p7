import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/user'

import { Link } from 'react-router-dom'

const Header = () => {
	const dispatch = useDispatch()

	const logout = () => {
		dispatch(logoutUser())
	}

	const userLoginReducer = useSelector((state) => {
		return state.userLogin
	})
	const { user } = userLoginReducer

	return (
		<div>
			<div>
				<div>
					<Link to={'/'}>blogs</Link>
					<Link to={'/users'}>users</Link>
				</div>

				{user ? (
					<div>
						<p>{user.name} logged in</p>
						<button onClick={logout}>Logout</button>
					</div>
				) : (
					<Link to='/login'>Click here to login</Link>
				)}
			</div>
			<h2>Blog app</h2>
		</div>
	)
}

export default Header
