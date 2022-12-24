import { generateNewReservation } from "../../__tests__/__mocks__/fakeData/newReservation"
import { generateRandomId } from "../../lib/features/reservations/utils"

it("show valid data on show endpoint after all shows sell", ()=> {
    cy.task("db:reset");

    cy.clock();

    cy.visit("/shows");
    cy.findAllByText(/sold out/).should('have.length', 1);

    const newReservation = generateNewReservation({
        reservationId: generateRandomId(),
        showId: 0,
        seatCount: 10
    })
    cy.task("addReservation", newReservation);
    cy.tick(1000);
    cy.findAllByText(/sold out/).should('have.length', 1);

    cy.tick(30000);

    cy.findAllByText(/sold out/).should('have.length', 2);
})