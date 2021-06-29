import { combineReducers, createStore } from 'redux'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = createStore(
	combineReducers({
		blogs: blogReducer,
		user: userReducer,
	})
)

export default store
