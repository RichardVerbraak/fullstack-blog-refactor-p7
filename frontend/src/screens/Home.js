import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../components/Header'
import Blogs from '../components/Blogs'
import Message from '../components/Message'
import CreateBlogForm from '../components/CreateBlogForm'

import { getAllBlogs } from '../actions/blogs'

const Home = ({ history }) => {
	const [visible, setVisible] = useState(false)

	const dispatch = useDispatch()

	const blogsReducer = useSelector((state) => {
		return state.blogs
	})
	const { loading: loadingBlogs, blogs, error: errorBlogs } = blogsReducer

	// Logged in users info
	const userLoginReducer = useSelector((state) => {
		return state.userLogin
	})
	const { user } = userLoginReducer

	useEffect(() => {
		if (!user) {
			history.push('/login')
		}
	}, [user, history])

	useEffect(() => {
		if (user) {
			dispatch(getAllBlogs())
		}
	}, [user, dispatch])

	return (
		<div>
			<div>
				<Header />

				{visible && <CreateBlogForm blogs={blogs} />}

				<button
					className='button-show-create'
					onClick={() => {
						setVisible(!visible)
					}}
				>
					{visible ? 'cancel' : 'create blog'}
				</button>

				{loadingBlogs ? (
					<h1>Loading blogs...</h1>
				) : errorBlogs ? (
					<Message message={errorBlogs} />
				) : (
					<div className='blogs'>
						<Blogs blogs={blogs} />
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
