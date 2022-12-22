import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

test('component user-reservation show correct text', async () => {
    render(<UserReservations userId={1} />);

    const buttonText = await screen.findByRole('button', {name: /Purchase more tickets/i});

    expect(buttonText).toBeInTheDocument();
})

test('component user-reservation show correct info when no tickets available', async () => {
    render(<UserReservations userId={0} />);

    const buttonText = await screen.findByRole('button', {name: /Purchase tickets/i});
    expect(buttonText).toBeInTheDocument();

    const heading = await screen.queryByRole('heading', {name: /Your Tickets/i});
    expect(heading).not.toBeInTheDocument();
})