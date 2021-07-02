import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import User from './components/User'
import Users from './components/Users'

import LoginForm from './components/LoginForm'
import Home from './screens/Home'

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path='/users/:id' component={User} />
				<Route path='/users' component={Users} />

				<Route path='/login' component={LoginForm} />

				<Route path='/' exact component={Home} />
			</Switch>
		</Router>
	)
}

export default App
