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
				<img
					className='mx-auto h-12 w-auto'
					src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
					alt='Workflow'
				></img>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 '>
					Login to application
				</h2>
				{error && <Message message={error} />}
				<form className='mt-8 space-y-6' onSubmit={onSubmitHandler}>
					<div className=''>
						<label htmlFor='username'>
							Username:
							<input
								autoComplete='text'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
						<label htmlFor='password'>
							Password:
							<input
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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

					<button
						className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						type='submit'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}

export default LoginForm
