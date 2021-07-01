import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from '../components/Blogs'
import CreateBlogForm from '../components/CreateBlogForm'
import UserForm from '../components/UserForm'
import { getAllBlogs } from '../actions/blogs'

const Home = ({ history }) => {
	const dispatch = useDispatch()

	const blogsReducer = useSelector((state) => {
		return state.blogs
	})
	const { loading: loadingBlogs, blogs } = blogsReducer

	const userReducer = useSelector((state) => {
		return state.userInfo
	})

	const { loading: loadingUser, user } = userReducer

	const [visible, setVisible] = useState(false)

	const logout = () => {
		dispatch({
			type: 'USER_LOGOUT',
		})
		localStorage.removeItem('user')

		// push back to UserForm
		history.push('/login')
	}

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

				{blogs && blogs.length > 0 && (
					<div className='blogs'>
						<Blogs blogs={blogs} />
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
