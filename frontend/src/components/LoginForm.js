import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actions/user'

import Message from './Message'

const LoginForm = ({ history }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const userReducer = useSelector((state) => {
		return state.userInfo
	})
	const { loading, user, error } = userReducer

	useEffect(() => {
		if (user) {
			// Push to home if logged in
			history.push('/')
		}
	}, [user, history])

	const onSubmitHandler = async (e) => {
		e.preventDefault()

		dispatch(loginUser({ username, password }))
	}

	return (
		<div>
			<h2>Login to application</h2>
			{error && <Message message={error} />}
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

export default LoginForm
