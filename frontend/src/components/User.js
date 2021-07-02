import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './Header'

const User = ({ match }) => {
	const id = match.params.id

	const dispatch = useDispatch()

	useEffect(() => {
		// dispatch getUserDetails
	}, [])

	return (
		<div>
			<Header />

			<h2>Some name</h2>
			<div>
				<h3>added blogs</h3>
				<ul>
					<li>Some blog name</li>
				</ul>
			</div>
		</div>
	)
}

export default User
