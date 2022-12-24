import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../lib/features/reservations/utils";

it("1.band show on load 2.add new band 3. refresh page 4. see new band", () => {
    cy.task("db:reset");
    cy.visit(`/bands`);
    cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should("exist");


    const bandId = generateRandomId();
    const band = generateNewBand(bandId);
    // cy.task("addBand", newBand);
    const secret = Cypress.env("REVALIDATION_SECRET");
    // console.log(Cypress.env())
    cy.request('POST', `/api/bands?secret=${"hBFZs5uCfYKoeoAnBUbXGBnLHp1rRzPQG4oBJr64OEw"}`, {
        newBand: band
    }).then((response)=> {
        expect(response.body.revalidated).to.equal(true);
    })

    cy.reload();

    cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should("exist");

    cy.resetAndClean();
});
