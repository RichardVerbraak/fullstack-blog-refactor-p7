import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../actions/blogs'

// useState holds the ID of the one that is clicked => the blog that matches the one in state will show it's content
// Hide button sets state back to null

const Blogs = ({ blogs, user }) => {
	const [currentBlog, setCurrentBlog] = useState(null)

	const dispatch = useDispatch()

	const blogStyle = {
		padding: '10px 20px',
		border: 'solid',
		margin: '10px 0px',
	}

	const likeBlogHandler = (blog, token) => {
		dispatch(likeBlog(blog, token))
	}

	const deleteBlogHandler = (blog, token) => {
		const confirm = window.confirm(
			`Remove blog ${blog.title} by ${blog.author} ?`
		)

		if (confirm) {
			dispatch(deleteBlog(blog, token))
		}
	}

	return blogs
		.sort((a, b) => {
			// return value is higher than 0 => b is sorted before a
			if (a.likes < b.likes) {
				return 1
			}

			// return value is less than 0 => a is sorted before b
			if (a.likes > b.likes) {
				return -1
			}

			// return value is 0 than a and b unchanged with respect to each other but sorted with respect to all different elements
			return 0
		})
		.map((blog) => {
			return (
				<div className='blog' key={blog.id} style={blogStyle}>
					<div>
						<p className='blog-title-author'>
							{blog.title} {blog.author}
							<span>
								{blog.id === currentBlog ? (
									<button
										onClick={() => {
											setCurrentBlog(null)
										}}
									>
										Hide
									</button>
								) : (
									<button
										className='button-view'
										onClick={() => {
											setCurrentBlog(blog.id)
										}}
									>
										View
									</button>
								)}
							</span>
						</p>
					</div>

					{blog.id === currentBlog && (
						<div>
							<p className='blog-url'>{blog.url}</p>
							<p className='blog-likes'>{blog.likes}</p>
							<button
								className='button-like'
								onClick={() => {
									likeBlogHandler(blog, user.token)
								}}
							>
								Like
							</button>
							<p>Creator</p>
							<button
								className='button-delete'
								onClick={() => {
									deleteBlogHandler(blog, user.token)
								}}
							>
								Remove
							</button>
						</div>
					)}
				</div>
			)
		})
}

export default Blogs
