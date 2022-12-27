import "@testing-library/cypress/add-commands";

Cypress.Commands.add("resetAndClean", ()=> {
    cy.task('db:reset');
    const secret = Cypress.env("REVALIDATION_SECRET");

    cy.request("GET", `api/revalidate?secret=hBFZs5uCfYKoeoAnBUbXGBnLHp1rRzPQG4oBJr64OEw`)
})

Cypress.Commands.add("loginAndAuth", (email, password)=> {
    cy.visit("/user")
    cy.findByLabelText(/email address/i).clear().type(email)
    cy.findByLabelText(/password/i).clear().type(password)

    cy.findByRole('main').within(()=> {
        cy.findByRole('button', {name: /Sign in/i}).click();
    })

    cy.findByRole('main').within(()=> {
        cy.findByRole('button', {name: /Sign in/i}).click();
    })

    cy.findAllByText(/Welcome/i).should('exist');
})