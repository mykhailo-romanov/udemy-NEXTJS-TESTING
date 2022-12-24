it('skips client-side bundle, ISR Cache render', () => {
    // https://glebbahmutov.com/blog/ssr-e2e/
    cy.request('/shows')
      .its('body')
      .then((html) => {
        // remove the application code bundle
        const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, '')
        cy.state('document').write(staticHtml)

        cy.findAllByText(/2022 apr/i).should('exist');
      })

    
})