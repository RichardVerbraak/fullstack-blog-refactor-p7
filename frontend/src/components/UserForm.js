import React, { useState } from 'react'
import { loginUser } from '../services/users'

import Message from './Message'

const UserForm = ({ setUser }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')

	const onSubmitHandler = async (e) => {
		e.preventDefault()

		try {
			const response = await loginUser({ username, password })

			setUser(response)
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
