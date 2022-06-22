import { Login } from ".";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { withMemoryRouter } from "../../test/helpers";

const mockLogin = jest.fn();
const Providers = ({ children }) => (
  <AuthContext.Provider value={{ login: mockLogin, logout: jest.fn() }}>
    {children}
  </AuthContext.Provider>
);
describe("Login page", () => {
  it("should render a title", () => {
    const wrapper = withMemoryRouter(Providers, ["/login"]);

    render(<Login />, { wrapper });

    expect(
      screen.getByRole("heading", { name: /log in/i })
    ).toBeInTheDocument();
  });

  it("should render an email field", () => {
    const wrapper = withMemoryRouter(Providers, ["/login"]);

    render(<Login />, { wrapper });

    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
  });

  it("should render a password field", () => {
    const wrapper = withMemoryRouter(Providers, ["/login"]);

    render(<Login />, { wrapper });

    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
  });

  it("should render a login button that attempts to log the user in using the input values", () => {
    const wrapper = withMemoryRouter(Providers, ["/login"]);

    render(<Login />, { wrapper });

    const emailField = screen.getByLabelText(/email:/i);
    fireEvent.change(emailField, { target: { value: "User" } });

    const passwordField = screen.getByLabelText(/password:/i);
    fireEvent.change(passwordField, { target: { value: "Test123" } });

    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    expect(mockLogin).toHaveBeenCalledWith("User", "Test123");
  });
});
