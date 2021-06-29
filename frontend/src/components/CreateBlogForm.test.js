import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { act, render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'

import CreateBlogForm from './CreateBlogForm'

// Excercise 5.16 --- can't test method or hooks, testing-library is only for testing what he user actually sees (no behind the scenes stuff)
test('Form submit button receives the right props when blog gets created', () => {
	const component = render(<CreateBlogForm />)

	const form = component.container.querySelector('.form')
})
