import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	blogListReducer,
	addBlogReducer,
	likeBlogReducer,
	deleteBlogReducer,
} from './reducers/blogReducer'

import {
	userLoginReducer,
	userListReducer,
	userDetailsReducer,
} from './reducers/userReducer'

const reducers = combineReducers({
	blogs: blogListReducer,
	users: userListReducer,

	userDetails: userDetailsReducer,
	userLogin: userLoginReducer,

	addBlog: addBlogReducer,
	likeBlog: likeBlogReducer,
	deleteBlog: deleteBlogReducer,
})

const userFromLocalStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: null

const initialState = {
	userLogin: { user: userFromLocalStorage },
}

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
