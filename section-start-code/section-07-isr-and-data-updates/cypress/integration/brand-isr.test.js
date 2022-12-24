it('skips client-side bundle, ISR Cache render Brand with id', () => {
    // https://glebbahmutov.com/blog/ssr-e2e/
    cy.request('/bands')
      .its('body')
      .then((html) => {
        // remove the application code bundle
        const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, '')
        cy.state('document').write(staticHtml)

        // cy.findAllByText(/edgy funk with an improvisational vibe/i).should('exist');
        cy.findByRole("heading", { name: /The Joyous Nun Riot/i }).should(
            "exist"
          );
      })

    
})