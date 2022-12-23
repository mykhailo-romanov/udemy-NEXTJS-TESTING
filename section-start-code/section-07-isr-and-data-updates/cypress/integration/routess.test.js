import { generateNewBand } from '../../__tests__/__mocks__/fakeData/newBand'
import { generateRandomId } from '../../lib/features/reservations/utils'

it("display correct correct heading when you navigate to show route", () => {
    cy.visit("/");
    cy.findByRole("button", {name: /shows/i }).click();
    cy.findByRole("heading", {name: /upcoming shows/i }).should("exist");
})

it("display correct heading when you navigate to brand route", () => {
    cy.visit("/");
    cy.findByRole("button", {name: /bands/i }).click();
    cy.findByRole("heading", {name: /Our Illustrious Performers/i }).should("exist");
})

it("show band with id 1", () => {
    cy.task("db:reset");
    cy.visit("/bands/1");
    cy.findByRole("heading", {name: /Shamrock Pete/i }).should("exist");
})

it("show error - not existing band id 1324", () => {
    cy.task("db:reset");
    cy.visit("/bands/1324");
    cy.findByRole("heading", {name: /Error: band not found/i }).should("exist");
})

it("show new band which was just created with random id", () => {
    const bandId = generateRandomId();
    const newBand = generateNewBand(bandId);
    cy.task("db:reset").task("addBand", newBand).visit(`/bands/${bandId}`);
    cy.findByRole("heading", {name: /Avalanche of Cheese/i }).should("exist");
})
