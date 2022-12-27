import { generateNewReservation } from "../../__tests__/__mocks__/fakeData/newReservation"
import { generateRandomId } from "../../lib/features/reservations/utils"

it("aunthitification check ", ()=> {
    cy.clock();
    cy.task("db:reset").visit("/reservations/0");

    // cy.visit("/user");
    cy.findAllByText(/Sign in to your account/i).should('exist');

    cy.findByLabelText(/email address/i).clear().type('test@test.test')
    cy.findByLabelText(/password/i).clear().type('test')

    cy.findByRole('main').within(()=> {
        cy.findByRole('button', {name: /Sign in/i}).click();
    })

    // cy.visit("/reservations/0");
    cy.findAllByText(/10 seats left/).should('exist');

    const newReservation = generateNewReservation({
        reservationId: generateRandomId(),
        showId: 0,
        seatCount: 2
    })
    cy.task("addReservation", newReservation);
    cy.tick(1000);
    cy.findAllByText(/10 seats left/).should('exist');

    cy.tick(15000);

    cy.findAllByText(/8 seats left/).should('exist');


    cy.findAllByText(/test@test.test/i).should('exist');
    cy.findAllByText(/email address/i).should('not.exist');
})