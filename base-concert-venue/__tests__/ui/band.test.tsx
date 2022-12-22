import { render, screen } from "@testing-library/react";

import BandPage from "@/pages/bands/[bandId]";
import { readFakeData } from "../__mocks__/fakeData";

test('check valid information on band page', async ()  => {

    const { fakeBands } = await readFakeData();
    render(<BandPage band={fakeBands[0]} error={null} />)

    const heading = screen.getByRole("heading", { name: /the wandering bunnies/i});
    expect(heading).toBeInTheDocument();
})

test('check if not valid band render an error on the page', () => {
    render(<BandPage band={null} error={'error'} />)

    const heading = screen.getByRole("heading", {
        name: /Could not retrieve band data: error/i
    })

    expect(heading).toBeInTheDocument();
})