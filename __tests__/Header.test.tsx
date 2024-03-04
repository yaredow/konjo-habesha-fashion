import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

beforeEach(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
});

it("should have Logo text", () => {
  render(<Home />);

  const myText = screen.getByText("Home");

  expect(myText).toBeInTheDocument();
});
