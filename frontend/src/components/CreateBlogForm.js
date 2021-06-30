import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../actions/blogs'

import Message from './Message'

const CreateBlogForm = ({ user }) => {
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

		// setMessage(`A new blog ${response.title} by ${response.author} added!`)

		// setTimeout(() => {
		// 	setMessage('')
		// }, 5000)
	}

	return (
		<div>
			{message && <Message message={message} />}
			<h2>Create new</h2>
			<form onSubmit={onSubmitHandler}>
				<div>
					<label>
						Title:
						<input
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
	)
}

export default CreateBlogForm
