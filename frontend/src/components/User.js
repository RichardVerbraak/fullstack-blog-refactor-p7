import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/user'

import Header from './Header'
import Message from './Message'

const User = ({ match, history }) => {
	const id = match.params.id

	const userDetails = useSelector((state) => {
		return state.userDetails
	})
	const { user, loading, error } = userDetails

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUserDetails(id))
	}, [dispatch, id])

	return (
		<div>
			<Header history={history} />

			{loading ? (
				<h2>Loading user details...</h2>
			) : error ? (
				<Message message={error} />
			) : (
				<div>
					<h2>{user.name}</h2>
					<div>
						<h3>added blogs</h3>
						<ul>
							{user.blogs &&
								user.blogs.map((blog) => {
									return <li key={blog.id}>{blog.title}</li>
								})}
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default User
