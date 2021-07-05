import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './Header'
import Message from './Message'

import { getBlogDetails } from '../actions/blogs'

const Blog = ({ match }) => {
	const id = match.params.id

	const dispatch = useDispatch()

	const blogDetails = useSelector((state) => {
		return state.blogDetails
	})
	const { blog, loading, error } = blogDetails

	useEffect(() => {
		dispatch(getBlogDetails(id))
	}, [dispatch, id])

	return (
		<div>
			<Header />

			{loading ? (
				<h2>Loading blog details...</h2>
			) : error ? (
				<Message message={error} />
			) : (
				<div>
					<h1>{blog.title}</h1>
					<div>
						<a href={blog.url}>{blog.url}</a>
						<p>{blog.likes} like</p>
						<p>added by {blog.user.name}</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default Blog
