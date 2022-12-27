
it("aunthitification check with no valid pass", ()=> {
    cy.task("db:reset").visit("/user");
    cy.findAllByText(/Sign in to your account/i).should('exist');
    cy.findAllByText(/Welcome/i).should('not.exist');

    kek('notvalidpassNOWTESTITPLS')
    cy.findAllByText(/Sign in failed/i).should('exist');

    kek('test@test.test')
    cy.findAllByText(/Welcome/i).should('exist');
    cy.findAllByText(/Sign Out/).should('exist');
    cy.findAllByText(/test@test.test/i).should('exist');
    cy.findAllByText(/email address/i).should('not.exist');
})


function kek (email) {
    cy.findByLabelText(/email address/i).clear().type(email)
    cy.findByLabelText(/password/i).clear().type('test')

    cy.findByRole('main').within(()=> {
        cy.findByRole('button', {name: /Sign in/i}).click();
    })
}

it("redirect to sign in for protected pages", ()=> {
    cy.fixture("protected-pages.json").then((url) => {
        url.map(($url) => {
            cy.visit($url);
            cy.findAllByText(/email address/i).should('exist');
            cy.findAllByText(/password/i).should('exist');
        })
    })
})

it("sign in and go to reservations page", ()=> {
    cy.task("db:reset");
    cy.loginAndAuth('test@test.test','test');
    cy.visit("/reservations/0")
    cy.findAllByText(/email address/i).should('not.exist');
    cy.findAllByText(/purchase/i).should('exist');
})

it("sign in and purchase more tickets", ()=> {
    cy.task("db:reset");
    cy.loginAndAuth('test@test.test','test');
    cy.visit("/user")
    cy.findAllByText(/email address/i).should('not.exist');
    cy.findAllByText(/purchase more ticket/i).should('exist');

    cy.findByRole('button', {name: /purchase more ticket/i}).click();
    cy.findAllByText(/Upcoming Shows/i).should('exist');
    
})