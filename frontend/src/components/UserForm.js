import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actions/user'

import Message from './Message'

const UserForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')

	const dispatch = useDispatch()

	const userReducer = useSelector((state) => {
		return state.userInfo
	})

	const { loading, user } = userReducer

	console.log(userReducer)

	// useEffect(() => {
	// 	if (user) {

	// 	}
	// }, [user])

	const onSubmitHandler = async (e) => {
		e.preventDefault()

		try {
			dispatch(loginUser({ username, password }))
		} catch (error) {
			const errorMessage = error.response
				? error.response.data.message
				: error.response

			setMessage(errorMessage)

			setTimeout(() => {
				setMessage('')
			}, 5000)
		}
	}

	return (
		<div>
			{message && <Message message={message} />}
			<form className='login-form' onSubmit={onSubmitHandler}>
				<div>
					<label>
						Username:
						<input
							id='username'
							type='text'
							name='username'
							value={username}
							onChange={(e) => {
								setUsername(e.target.value)
							}}
						/>
					</label>
				</div>

				<div>
					<label>
						Password:
						<input
							id='password'
							type='password'
							name='password'
							value={password}
							onChange={(e) => {
								setPassword(e.target.value)
							}}
						/>
					</label>
				</div>

				<button className='login-button' type='submit'>
					Login
				</button>
			</form>
		</div>
	)
}

export default UserForm
