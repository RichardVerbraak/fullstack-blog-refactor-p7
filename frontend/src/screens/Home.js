import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from '../components/Blogs'
import Message from '../components/Message'
import CreateBlogForm from '../components/CreateBlogForm'
import { getAllBlogs } from '../actions/blogs'
import { logoutUser } from '../actions/user'

const Home = ({ history }) => {
	const [visible, setVisible] = useState(false)

	const dispatch = useDispatch()

	const blogsReducer = useSelector((state) => {
		return state.blogs
	})
	const { loading: loadingBlogs, blogs, errorBlogs } = blogsReducer

	const userReducer = useSelector((state) => {
		return state.userInfo
	})
	const { loading: loadingUser, user } = userReducer

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

	const logout = () => {
		dispatch(logoutUser())
	}

	return (
		<div>
			<div>
				<h2>Blogs</h2>
				<div>
					<p>
						{user && user.username} logged in{' '}
						<span>
							<button onClick={logout}>Logout</button>
						</span>
					</p>
				</div>

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