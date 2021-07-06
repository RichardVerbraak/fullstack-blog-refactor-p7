import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './Header'
import Message from './Message'

import { likeBlog, getBlogDetails } from '../actions/blogs'

const Blog = ({ match, history }) => {
	const [comment, setComment] = useState('')

	const id = match.params.id

	const dispatch = useDispatch()

	const blogDetails = useSelector((state) => {
		return state.blogDetails
	})
	const { blog, loading, error } = blogDetails

	useEffect(() => {
		dispatch(getBlogDetails(id))
	}, [dispatch, id])

	// const deleteBlogHandler = (blog) => {
	// 	const confirm = window.confirm(
	// 		`Remove blog ${blog.title} by ${blog.author} ?`
	// 	)

	// 	if (confirm) {
	// 		dispatch(deleteBlog(blog))
	// 	}
	// }

	const commentHandler = () => {}

	return (
		<div>
			<Header history={history} />

			{loading ? (
				<h2>Loading blog details...</h2>
			) : error ? (
				<Message message={error} />
			) : (
				<div>
					<div>
						<h1>{blog.title}</h1>
						<div>
							<a href={blog.url}>{blog.url}</a>
							<p>
								{blog.likes} likes{' '}
								<button
									onClick={() => {
										dispatch(likeBlog(blog))
									}}
								>
									like
								</button>
							</p>
							{blog.user && <p>added by {blog.user.name}</p>}
						</div>
					</div>
					<div>
						<h3>Comments</h3>
						<input
							type='text'
							onChange={(e) => {
								setComment(e.target.value)
							}}
						/>
						<button onClick={commentHandler}>add comment</button>
						<ul>
							{blog.comments &&
								blog.comments.map((comment) => {
									return <li>{comment}</li>
								})}
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}

export default Blog
