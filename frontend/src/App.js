import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserForm from './components/UserForm'
import Home from './screens/Home'

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path='/login' component={UserForm} />
				<Route path='/' exact component={Home} />
			</Switch>
		</Router>
	)
}

export default App
