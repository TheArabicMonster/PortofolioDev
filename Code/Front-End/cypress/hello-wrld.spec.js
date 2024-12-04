describe('Hello World Test', () => {
    it('Visits the app root url', () => {
      cy.visit('/')
      cy.contains('h1', 'Welcome to Your Vue.js App')
    })
  })