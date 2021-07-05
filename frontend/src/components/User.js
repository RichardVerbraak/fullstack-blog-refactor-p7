import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/user'

import Header from './Header'

const User = ({ match }) => {
	const id = match.params.id

	const userDetails = useSelector((state) => {
		return state.userDetails
	})
	const { user } = userDetails

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUserDetails(id))
	}, [dispatch, id])

	return (
		<div>
			<Header />

			{user && (
				<div>
					<h2>{user.name}</h2>
					<div>
						<h3>added blogs</h3>
						<ul>
							{user.blogs.map((blog) => {
								return <li>{blog.title}</li>
							})}
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default User
