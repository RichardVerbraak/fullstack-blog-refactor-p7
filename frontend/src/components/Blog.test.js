import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'
import Blogs from './Blogs'

test('Blog with only title and author and no likes/url by default', () => {
	const blogs = [
		{
			title: 'Dagon',
			author: 'H.P. Lovecraft',
		},
	]

	const component = render(<Blogs blogs={blogs} />)

	const content = component.container.querySelector('.blog-title-author')

	expect(content).toHaveTextContent('Dagon H.P. Lovecraft')
})

test('Shows the URL and Likes when button is clicked', () => {
	const blogs = [
		{
			title: 'Dagon',
			author: 'H.P. Lovecraft',
			url: 'something.com',
			likes: 5,
		},
	]

	const component = render(<Blogs blogs={blogs} />)

	const button = component.container.querySelector('.button-view')
	fireEvent.click(button)

	const url = component.container.querySelector('.blog-url')
	const likes = component.container.querySelector('.blog-likes')

	expect(url).toHaveTextContent('something.com')
	expect(likes).toHaveTextContent('5')
})

// 5.15 excersice -- Can't test component methods with testing-library...
// test('Like handler called twice if button is also pressed twice', () => {
// 	const blogs = [
// 		{
// 			title: 'Dagon',
// 			author: 'H.P. Lovecraft',
// 			url: 'something.com',
// 			likes: 5,
// 		},
// 	]

// 	const test = jest.fn()

// 	const component = render(<Blogs blogs={blogs} test={test} />)

// 	const viewButton = component.container.querySelector('.button-view')
// 	fireEvent.click(viewButton)

// 	const likeButton = component.container.querySelector('.button-like')
// 	fireEvent.click(likeButton)
// })
