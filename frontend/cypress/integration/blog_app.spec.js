describe('Blog app', function () {
	beforeEach(function () {
		// Reset DB
		cy.request('POST', 'http://localhost:3003/api/test/reset')

		const user = {
			username: 'BobbyH',
			name: 'Bobby Hill',
			password: 'bobby123',
		}

		cy.request('POST', 'http://localhost:3003/api/users', user)

		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.get('.login-form').contains('Username')
	})

	describe('Login', () => {
		it('success with right credentials', function () {
			cy.login('BobbyH', 'bobby123')
			cy.contains('BobbyH logged in')
		})

		it('failure with wrong credentials', function () {
			cy.get('#username').type('BobbyH')
			cy.get('#password').type('wrongpassword')
			cy.get('.login-button').click()

			cy.contains('Wrong username or password')
		})
	})

	describe('When user is logged in', function () {
		beforeEach(function () {
			// Login user
			cy.login('BobbyH', 'bobby123')
		})

		it('User can create a new blog', function () {
			cy.contains('create blog')
			cy.get('.button-show-create').click()
			cy.get('#title').type('Season of Storms')
			cy.get('#author').type('Andzrej Sapkowski')
			cy.get('#url').type('something.com')

			cy.get('.button-create').click()

			cy.contains('Season of Storms Andzrej Sapkowski')
		})

		it('User can like a blog', function () {
			cy.contains('create blog')
			cy.get('.button-show-create').click()
			cy.get('#title').type('Season of Storms')
			cy.get('#author').type('Andzrej Sapkowski')
			cy.get('#url').type('something.com')

			cy.get('.button-create').click()

			cy.get('.button-view').click()

			cy.get('.button-like').click()

			cy.get('.blog-likes').contains(1)
		})

		it('User can delete a blog', function () {
			cy.contains('create blog')
			cy.get('.button-show-create').click()
			cy.get('#title').type('Season of Storms')
			cy.get('#author').type('Andzrej Sapkowski')
			cy.get('#url').type('something.com')

			cy.get('.button-create').click()

			cy.get('.button-view').click()

			cy.get('.button-delete').click()

			cy.get('.blogs').should('not.exist')
		})

		it.only('Blogs are sorted in a descending order of likes', function () {
			cy.contains('create blog')

			// Create first blog with 1 like
			cy.get('.button-show-create').click()
			cy.get('#title').type('Season of Storms')
			cy.get('#author').type('Andzrej Sapkowski')
			cy.get('#url').type('something.com')

			cy.get('.button-create').click()
			cy.get('.button-view').click()
			cy.get('.button-like').click()

			// Create second blog with 0 likes
			cy.get('#title').type('Baptism of Fire')
			cy.get('#author').type('Andzrej Sapkowski')
			cy.get('#url').type('something.com')

			cy.get('.button-create').click()

			cy.wait(500)

			cy.get('.blog').then((blogs) => {
				Cypress.$.makeArray(blogs).map((blog) => {
					console.log(blog)
				})
			})
		})
	})
})
