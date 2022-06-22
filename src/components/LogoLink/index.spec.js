import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LogoLink } from ".";

describe("LogoLink", () => {
  it('should render a link that routes to "/"', () => {
    const Component = () => (
      <MemoryRouter initialEntries={["/about"]}>
        <Routes>
          <Route
            index
            element={
              <>
                <LogoLink />
                <h1>Home</h1>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <LogoLink />
                <h1>About</h1>
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    render(<Component />);

    expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: /logo/i }));

    expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument();
  });
});
