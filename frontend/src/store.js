import { combineReducers, createStore, applyMiddleware } from 'redux'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

const store = createStore(
	combineReducers({
		blogs: blogReducer,
		user: userReducer,
	}),
	applyMiddleware(thunk)
)

export default store
