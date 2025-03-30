import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

describe("<LandingPage />", () => {
    it("Renders logo, welcome message, and Get Starter button", () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        // logo
        expect(screen.getByAltText("Logo Lithia")).toBeInTheDocument();

        // Titolo principale
        expect(screen.getByRole("heading", { name: /lithia motors service!/i })).toBeInTheDocument();

        // Button Get Started
        expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
    })
})