import { render, screen } from "@testing-library/react";
import { LogoIcon } from ".";

describe("LogoIcon", () => {
  it("should render an icon", () => {
    render(<LogoIcon />);

    expect(screen.getByTitle(/path logo/i)).toBeInTheDocument();
  });
});
