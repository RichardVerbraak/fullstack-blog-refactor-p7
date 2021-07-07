import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actions/user'

import Message from './Message'

const LoginForm = ({ history }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const userLoginReducer = useSelector((state) => {
		return state.userLogin
	})
	const { user, error } = userLoginReducer

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
		<div className='container mx-auto h-screen flex items-center'>
			<div className='mx-auto'>
				<h2 className='font-medium text-xl '>Login to application</h2>
				{error && <Message message={error} />}
				<form className='login-form' onSubmit={onSubmitHandler}>
					<div className=''>
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

					<button className='button' type='submit'>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default LoginForm
