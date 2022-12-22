import { render, screen } from "@testing-library/react";

import Home from "@/pages/index";

test('page has correct heading text', () => {
    render(<Home />);
    
    const heading = screen.getByRole("heading", {name: "Welcome to Popular Concert Venue",});

    const img = screen.getByRole('img', {
        name: "Concert goer with hands in the shape of a heart"
    })

    expect(heading).toBeInTheDocument();
    expect(img).toBeInTheDocument();
})