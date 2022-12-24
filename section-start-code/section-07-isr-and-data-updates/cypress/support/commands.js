import "@testing-library/cypress/add-commands";

Cypress.Commands.add("resetAndClean", ()=> {
    cy.task('db:reset');
    const secret = Cypress.env("REVALIDATION_SECRET");

    cy.request("GET", `api/revalidate?secret=hBFZs5uCfYKoeoAnBUbXGBnLHp1rRzPQG4oBJr64OEw`)
})