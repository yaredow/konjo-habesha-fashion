import { render, screen } from "@testing-library/react";
import Header from "@/components/header/header";

it("should have Logo text", () => {
  render(<Header />);

  const myText = screen.getByText("Shop");

  expect(myText).toBeInTheDocument();
});
