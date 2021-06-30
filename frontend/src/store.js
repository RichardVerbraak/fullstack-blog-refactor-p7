import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	blogListReducer,
	addBlogReducer,
	likeBlogReducer,
	deleteBlogReducer,
} from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
	blogs: blogListReducer,
	user: userReducer,

	addBlog: addBlogReducer,
	likeBlog: likeBlogReducer,
	deleteBlog: deleteBlogReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
