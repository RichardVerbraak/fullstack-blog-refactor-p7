import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'

import User from './components/User'
import Users from './components/Users'

import LoginForm from './components/LoginForm'
import Home from './screens/Home'
import Blog from './components/Blog'
import { useSelector } from 'react-redux'

// A function that takes in the component and the rest (history, location, match provided by default by react-router)
// It checks the redux state, if the user is logged in, return the component that was provided with said props
// If there isn't, return a Redirect back to login screen
const PrivateRoute = ({ component: Component, ...rest }) => {
	const userLogin = useSelector((state) => {
		return state.userLogin
	})
	const { user, loading } = userLogin

	return (
		<Route
			{...rest}
			render={(props) => {
				return user && !loading ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}}
		/>
	)
}

const App = () => {
	return (
		<Router>
			<Switch>
				<PrivateRoute path='/blogs/:id' component={Blog} />

				<PrivateRoute path='/users/:id' component={User} />
				<PrivateRoute path='/users' component={Users} />

				<Route path='/login' component={LoginForm} />

				<PrivateRoute path='/' exact component={Home} />
			</Switch>
		</Router>
	)
}

export default App
