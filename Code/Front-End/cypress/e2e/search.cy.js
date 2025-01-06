describe('Search Functionality', () => {
  it('should display search results when a search term is entered', () => {
    // Visiter la page d'accueil
    cy.visit('/')

    // Saisir un terme de recherche dans la barre de recherche
    cy.get('input[placeholder="Rechercher un livre"]').type('comte')

    // Cliquer sur le bouton de recherche
    cy.get('button').contains('Rechercher').click()

    // Vérifier que la page de résultats de recherche est affichée
    cy.url().should('include', '/search?q=erreur')

    // Vérifier que les résultats de recherche contiennent le terme recherché
    cy.get('h1').should('contain', 'Résultats de recherche pour "comte"')
    //cy.get('li').should('have.length.greaterThan', 0)
    //cy.get('li').each(($el) => {
    //  cy.wrap($el).should('contain.text', 'comte')
    //})
  })
})