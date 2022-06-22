import { AuthedLayout } from ".";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../../contexts/AuthContext";
import { withMemoryRouter } from "../../../test/helpers";
import { Routes, Route } from "react-router-dom";

const Providers = ({ children }) => (
  <AuthContext.Provider
    value={{ user: { name: "Grant" }, login: jest.fn(), logout: jest.fn() }}
  >
    {children}
  </AuthContext.Provider>
);

describe("AuthedLayout", () => {
  it("should render an AuthedNavbar", () => {
    const wrapper = withMemoryRouter(Providers);

    render(
      <Routes>
        <Route path="/" element={<AuthedLayout />} />
      </Routes>,
      { wrapper }
    );

    expect(
      screen.getByRole("button", { name: /log out/i })
    ).toBeInTheDocument();
  });

  it("should render an the outlet component", () => {
    const wrapper = withMemoryRouter(Providers);
    const TestOutlet = () => <h1>Outlet component</h1>;

    render(
      <Routes>
        <Route element={<AuthedLayout />}>
          <Route path="/" element={<TestOutlet />} />
        </Route>
      </Routes>,
      { wrapper }
    );

    expect(
      screen.getByRole("heading", { name: /outlet component/i })
    ).toBeInTheDocument();
  });

  it("should render a footer", () => {
    const wrapper = withMemoryRouter(Providers);

    render(
      <Routes>
        <Route path="/" element={<AuthedLayout />} />
      </Routes>,
      { wrapper }
    );

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
