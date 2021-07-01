import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	blogListReducer,
	addBlogReducer,
	likeBlogReducer,
	deleteBlogReducer,
} from './reducers/blogReducer'
import { userReducer, userListReducer } from './reducers/userReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
	blogs: blogListReducer,
	userInfo: userReducer,
	users: userListReducer,

	addBlog: addBlogReducer,
	likeBlog: likeBlogReducer,
	deleteBlog: deleteBlogReducer,
})

const userFromLocalStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: null

const initialState = {
	userInfo: { user: userFromLocalStorage },
}

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
