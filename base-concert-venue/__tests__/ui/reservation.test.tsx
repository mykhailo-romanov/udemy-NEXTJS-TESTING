import { render, screen } from "@testing-library/react";

import { Reservation } from "@/components/reservations/Reservation";

test('component reservation shows correct number of seats', async () => {
    render(<Reservation showId={0} submitPurchase={jest.fn()} />);
    const numberOfSeats = await screen.findByText(/10 seats left/i);

    expect(numberOfSeats).toBeInTheDocument();
})

test('component reservation shows no seats available and button purchase NOT displayed', async () => {
    render(<Reservation showId={1} submitPurchase={jest.fn()} />);
    const soldOutText = await screen.findByText(/Show is sold out!/i);
    const buttonPurchase = await screen.queryByRole('button', {name: /purchase/i})

    expect(soldOutText).toBeInTheDocument();
    expect(buttonPurchase).not.toBeInTheDocument();
})