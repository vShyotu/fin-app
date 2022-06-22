import { NotFound } from ".";
import { Routes, Route } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { withMemoryRouter } from "../../test/helpers";

const Providers = ({ children }) => (
  <AuthContext.Provider
    value={{ login: jest.fn(), logout: jest.fn(), user: { name: "Grant" } }}
  >
    {children}
  </AuthContext.Provider>
);

const ProvidersLoggedOut = ({ children }) => (
  <AuthContext.Provider value={{ login: jest.fn(), logout: jest.fn() }}>
    {children}
  </AuthContext.Provider>
);

describe("Not Found Page", () => {
  it("should render an icon", () => {
    const wrapper = withMemoryRouter(Providers, ["/not-found"]);

    render(
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>,
      { wrapper }
    );

    expect(screen.getByText(/icon/i)).toBeInTheDocument();
  });

  it("should render a title", () => {
    const wrapper = withMemoryRouter(Providers, ["/not-found"]);

    render(
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>,
      { wrapper }
    );

    expect(
      screen.getByRole("button", { name: /back to your account/i })
    ).toBeInTheDocument();
  });

  it("should render some instructional content", () => {
    const wrapper = withMemoryRouter(Providers, ["/not-found"]);

    render(
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>,
      { wrapper }
    );

    expect(
      screen.getByText(/this page could not be found/i)
    ).toBeInTheDocument();
  });

  describe("when logged in", () => {
    it('should render a button labelled "Go home" that goes to the account overview page', () => {
      const wrapper = withMemoryRouter(Providers, ["/not-found"]);

      render(
        <Routes>
          <Route path="/" element={<h1>Account Overview</h1>} />
          <Route path="*" element={<NotFound />} />
        </Routes>,
        { wrapper }
      );

      fireEvent.click(
        screen.getByRole("button", { name: /back to your account/i })
      );

      expect(
        screen.getByRole("heading", { name: /account overview/i })
      ).toBeInTheDocument();
    });

    it("should NOT show an additional help section", () => {
      const wrapper = withMemoryRouter(Providers, ["/not-found"]);

      render(
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>,
        { wrapper }
      );

      expect(
        screen.queryByRole("heading", { name: /need help\?/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: "0123 123 1234" })
      ).not.toBeInTheDocument();
    });
  });

  describe("when logged out", () => {
    it('should NOT render a button labelled "Go home"', () => {
      const wrapper = withMemoryRouter(ProvidersLoggedOut, ["/not-found"]);

      render(
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>,
        { wrapper }
      );

      expect(
        screen.queryByRole("button", { name: /back to your account/i })
      ).not.toBeInTheDocument();
    });

    it("should show an additional help section", () => {
      const wrapper = withMemoryRouter(ProvidersLoggedOut, ["/not-found"]);

      render(
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>,
        { wrapper }
      );

      expect(
        screen.getByRole("heading", { name: /need help\?/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "0123 123 1234" })
      ).toBeInTheDocument();
    });
  });
});
