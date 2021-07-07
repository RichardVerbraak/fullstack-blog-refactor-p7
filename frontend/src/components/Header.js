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
			<div className='flex justify-between'>
				<div>
					<Link
						to={'/'}
						className='text-gray-300 bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
					>
						blogs
					</Link>
					<Link
						to={'/users'}
						className='text-gray-300 bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
					>
						users
					</Link>
				</div>

				{user ? (
					<div className='flex'>
						<p>{user.name} logged in</p>
					</div>
				) : (
					<Link to='/login'>Click here to login</Link>
				)}

				<button
					className='text-gray-300 bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
					onClick={logout}
				>
					Logout
				</button>
			</div>
			<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 '>
				Blog app
			</h2>
		</div>
	)
}

export default Header
