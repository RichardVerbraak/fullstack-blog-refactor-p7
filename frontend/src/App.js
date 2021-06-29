import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import CreateBlogForm from './components/CreateBlogForm'
import UserForm from './components/UserForm'
import { getAllBlogs } from './actions/blogs'

const App = () => {
	const dispatch = useDispatch()
	const blogsReducer = useSelector((state) => {
		return state.blogs
	})

	const { loading, blogs } = blogsReducer

	const [user, setUser] = useState(null)
	const [visible, setVisible] = useState(false)

	const logout = () => {
		localStorage.removeItem('user')
		setUser(null)
		// setBlogs([])
	}

	useEffect(() => {
		const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
		if (userFromLocalStorage) {
			setUser(userFromLocalStorage)
		}
	}, [])

	useEffect(() => {
		if (user) {
			dispatch(getAllBlogs())
		}
	}, [user, dispatch])

	return (
		<div>
			{user ? (
				<div>
					<h2>Blogs</h2>
					<div>
						<p>
							{user.username} logged in{' '}
							<span>
								<button onClick={logout}>Logout</button>
							</span>
						</p>
					</div>

					{visible && <CreateBlogForm user={user} blogs={blogs} />}

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
							<Blogs blogs={blogs} user={user} />
						</div>
					)}
				</div>
			) : (
				<div>
					<h2>Login to application</h2>
					<UserForm setUser={setUser} />
				</div>
			)}
		</div>
	)
}

export default App
