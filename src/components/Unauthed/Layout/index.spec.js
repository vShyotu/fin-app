import { UnauthedLayout } from ".";
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

describe("UnauthedLayout", () => {
  it("should render an UnauthedNavbar", () => {
    const wrapper = withMemoryRouter(Providers);

    render(
      <Routes>
        <Route path="/" element={<UnauthedLayout />} />
      </Routes>,
      { wrapper }
    );

    expect(screen.getByRole("link", { name: /secure/i })).toBeInTheDocument();
  });

  it("should render an the outlet component", () => {
    const wrapper = withMemoryRouter(Providers);
    const TestOutlet = () => <h1>Outlet component</h1>;

    render(
      <Routes>
        <Route element={<UnauthedLayout />}>
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
        <Route path="/" element={<UnauthedLayout />} />
      </Routes>,
      { wrapper }
    );

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
