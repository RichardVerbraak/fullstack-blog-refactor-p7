import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

const store = createStore(
	combineReducers({
		blogs: blogReducer,
		user: userReducer,
	}),
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
