import React, { useState } from 'react'
import { getAllBlogs, likeBlog, deleteBlog } from '../services/blogs'

// useState holds the ID of the one that is clicked => the blog that matches the one in state will show it's content
// Hide button sets state back to null

const Blogs = ({ blogs, user, setBlogs }) => {
	const [currentBlog, setCurrentBlog] = useState(null)

	const blogStyle = {
		padding: '10px 20px',
		border: 'solid',
		margin: '10px 0px',
	}

	// Adds a like and then fetches blogs again
	const likeBlogHandler = async (blog, token) => {
		await likeBlog(blog, token)
		const response = await getAllBlogs(token)
		setBlogs(response)
	}

	const deleteBlogHandler = async (blog, token) => {
		const confirm = window.confirm(
			`Remove blog ${blog.title} by ${blog.author} ?`
		)

		if (confirm) {
			await deleteBlog(blog, user.token)
			const response = await getAllBlogs(token)
			setBlogs(response)
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
									deleteBlogHandler(blog)
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
