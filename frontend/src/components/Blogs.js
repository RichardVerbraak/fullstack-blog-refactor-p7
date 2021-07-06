import React from 'react'
import { Link } from 'react-router-dom'

// useState holds the ID of the one that is clicked => the blog that matches the one in state will show it's content
// Hide button sets state back to null

const Blogs = ({ blogs }) => {
	const blogStyle = {
		padding: '10px 20px',
		border: 'solid',
		margin: '10px 0px',
	}

	return (
		<div>
			{blogs.length === 0 && <h1>No blogs, go create some!</h1>}

			{blogs.length > 0 &&
				blogs
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
									<Link to={`/blogs/${blog.id}`} className='blog-title-author'>
										{blog.title} {blog.author}
									</Link>
								</div>
							</div>
						)
					})}
		</div>
	)
}

export default Blogs
