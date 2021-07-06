import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/user'

const Header = ({ history }) => {
	const dispatch = useDispatch()

	const logout = () => {
		dispatch(logoutUser())
		history.push('/login')
	}

	// Logged in users details
	const userLoginReducer = useSelector((state) => {
		return state.userLogin
	})
	const { user } = userLoginReducer

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
