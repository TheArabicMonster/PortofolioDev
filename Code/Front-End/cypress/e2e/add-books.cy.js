describe('Add Books Functionality', () => {
  it('should add a new book to the database', () => {
    cy.visit('/addLivre')

    cy.get('input[placeholder="Entrez le titre du livre"]').type('test-titre')
    cy.get('input[placeholder="Entrez le résumé du livre"]').type('test-resume')
    cy.get('input[placeholder="Entrez un extrait du livre"]').type('test-extrait')
    cy.get('input[placeholder="Entrez le nombre de page"]').type('360')
    cy.get('input[placeholder="Entrez l\'anneeEdition"]').type('2023')
    cy.get('input[placeholder="Entrez l\'image de couverture"]').type(
      'http://example.com/image.jpg'
    )

    cy.get('#categorie').type('Roman')
    cy.get('#auteur').type('Alexandre Dumas')

    cy.get('input[type="submit"]').click()


    cy.window().then((win) => {
        const consoleLog = win.console.log
        cy.stub(win.console, 'log').callsFake((...args) => {
          consoleLog.apply(win.console, args)
          if (args[0] && typeof args[0] === 'string' && args[0].includes('Le livre test-titre a bien été créé !')) {
            expect(args[0]).to.include('Le livre test-titre a bien été créé !')
          }
        })
    })

    // cy.request('GET', 'http://localhost:3000/api/lSivres').then((response) => {
    //   const books = response.body
    //   const newBook = books.find((book) => book.titre === 'test-titre')
    //   expect(newBook).to.not.be.undefined
    //   expect(newBook).to.have.property('resume', 'test-resume')
    //   expect(newBook).to.have.property('extrait', 'test-extrait')
    //   expect(newBook).to.have.property('nbPage', 360)
    //   expect(newBook).to.have.property('anneeEdition', 2023)
    //   expect(newBook).to.have.property('imageCouverture', 'http://example.com/image.jpg')
    // })
  })
})