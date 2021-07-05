import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../actions/user'

import { Link } from 'react-router-dom'

import Header from './Header'

const Users = ({ history }) => {
	const dispatch = useDispatch()

	const userListReducer = useSelector((state) => {
		return state.users
	})
	const { users, loading } = userListReducer

	useEffect(() => {
		dispatch(getAllUsers())
	}, [dispatch])

	return (
		<div>
			<Header history={history} />

			<h2>Users</h2>

			{loading ? (
				<h1>Loading users...</h1>
			) : (
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>Blogs created</th>
						</tr>

						{users.map((user) => {
							return (
								<tr key={user.id}>
									<td>
										<Link to={`/users/${user.id}`}>{user.name}</Link>
									</td>
									<td>{user.blogs.length}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default Users
