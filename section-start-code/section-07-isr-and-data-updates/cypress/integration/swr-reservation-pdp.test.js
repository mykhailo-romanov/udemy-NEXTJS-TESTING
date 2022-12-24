import { generateNewReservation } from "../../__tests__/__mocks__/fakeData/newReservation"
import { generateRandomId } from "../../lib/features/reservations/utils"

it("show valid data on reservation 0 endpoint after all shows sell", ()=> {
    cy.clock();
    cy.task("db:reset");

    cy.visit("/user");
    cy.findByRole('main').within(()=> {
        cy.findByRole('button', {name: /Sign in/i}).click();
    })

    cy.visit("/reservations/0");
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
})