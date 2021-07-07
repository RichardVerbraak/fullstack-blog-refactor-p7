import React, { useState, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../actions/blogs'

import Message from './Message'

const CreateBlogForm = ({ user }) => {
	const [visible, setVisible] = useState(false)

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [message, setMessage] = useState('')

	const dispatch = useDispatch()

	const onSubmitHandler = (e) => {
		e.preventDefault()

		dispatch(addNewBlog({ title, author, url }))

		setTitle('')
		setAuthor('')
		setUrl('')

		setMessage(`A new blog ${title} by ${author} added!`)

		setTimeout(() => {
			setMessage('')
		}, 5000)
	}

	return (
		<div>
			<button
				className='button-show-create'
				onClick={() => {
					setVisible(!visible)
				}}
			>
				{visible ? 'cancel' : 'create blog'}
			</button>

			{message && <Message message={message} />}

			{visible && (
				<div className='max-w-3xl mx-auto'>
					<h2>Create new</h2>
					<form className='mt-8 space-y-6' onSubmit={onSubmitHandler}>
						<div>
							<label>
								Title:
								<input
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									id='title'
									type='text'
									name='title'
									value={title}
									onChange={(e) => {
										setTitle(e.target.value)
									}}
								/>
							</label>
						</div>

						<div>
							<label>
								Author:
								<input
									id='author'
									type='author'
									name='author'
									value={author}
									onChange={(e) => {
										setAuthor(e.target.value)
									}}
								/>
							</label>
						</div>

						<div>
							<label>
								URL:
								<input
									id='url'
									type='text'
									name='url'
									value={url}
									onChange={(e) => {
										setUrl(e.target.value)
									}}
								/>
							</label>
						</div>

						<button className='button-create' type='submit'>
							Create
						</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default CreateBlogForm
