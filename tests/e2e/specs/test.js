// https://docs.cypress.io/api/introduction/api.html

describe('Main App Tests', () => {
    it('Visits the app root url', () => {
        cy.visit('/')
        cy.contains('h1', 'Home')
    })

    it('Visits the login page', () => {
        cy.contains('Sign in').click()
        cy.contains('h1', 'Login')
        cy.url().should('include', '/login')
    })

    it('Tests login fields', () => {
        cy.get('form').submit()
        cy.contains('Please type a valid login.')
        cy.contains('Please type a valid password.')

        cy.get('#username')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')

        cy.get('#password')
            .type('Azerty123456')
            .should('have.value', 'Azerty123456')
    })

    it('Should fail authentication', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/auth/login',
            response: {
                status: 401,
                message: 'Forbidden'
            }
        })

        cy.get('form').submit()

        cy.get('.error').should('contain', `L'identifiant ou le mot de passe est invalide`)
    })

    it('Should succes authentication', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: '/auth/login',
            response: {
                status: 200,
                data: { access_token: 'jeSuisUnJWT' }
            }
        })
        cy.route({
            method: 'GET',
            url: '/users/1',
            response: {
                status: 200,
                data: { firstname: 'John' }
            }
        })

        cy.get('#username')
            .clear()
            .type('john@doe.com')
            .get('#password')
            .clear('')
            .type('Azerty1234')

        cy.get('form').submit()

        cy.contains('h1', 'Home')
    })
})
