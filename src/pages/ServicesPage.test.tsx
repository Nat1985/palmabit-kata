import { describe, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import ServicesPage from "./ServicesPage";
import { render, screen } from "@testing-library/react";

// Mock di useServices
vi.mock("../hooks/useServices", () => ({
    useServices: () => ({
        data: [
            { id: 0, serviceName: "Synthetic Oil Change", serviceDuration: 1800 },
            { id: 1, serviceName: "Brake Inspection", serviceDuration: 1800 },
        ],
        isLoading: false,
        error: null
    })
}))

describe("<ServicesPage />", () => {
    it("Renders a list of ServicesCards when data is loaded", () => {
        render(
            <BrowserRouter>
                <ServicesPage />
            </BrowserRouter>
        );
        expect(screen.getAllByText(/Synthetic Oil Change/i)).toHaveLength(2);
        expect(screen.getAllByText(/Brake Inspection/i)).toHaveLength(2);
    });
})