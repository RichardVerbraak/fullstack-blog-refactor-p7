import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../actions/user'

const Users = () => {
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
								<tr>
									<td>{user.name}</td>
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
