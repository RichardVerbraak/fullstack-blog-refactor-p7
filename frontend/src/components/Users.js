import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../actions/user'

const Users = () => {
	const dispatch = useDispatch()

	const userListReducer = useSelector((state) => {
		return state.users
	})
	const { users } = userListReducer

	useEffect(() => {
		dispatch(getAllUsers())
	}, [dispatch])

	return (
		<div>
			<h2>Users</h2>
		</div>
	)
}

export default Users
