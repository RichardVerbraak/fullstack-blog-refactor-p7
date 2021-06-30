import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { blogListReducer, addBlogReducer } from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
	addBlog: addBlogReducer,
	blogs: blogListReducer,
	user: userReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
