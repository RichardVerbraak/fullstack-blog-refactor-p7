import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './Header'
import Message from './Message'

import { likeBlog, getBlogDetails } from '../actions/blogs'

const Blog = ({ match, history }) => {
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

	return (
		<div>
			<Header history={history} />

			{loading ? (
				<h2>Loading blog details...</h2>
			) : error ? (
				<Message message={error} />
			) : (
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
			)}
		</div>
	)
}

export default Blog
