import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthProvider } from "./AuthProvider";

const TestComponent = () => {
  const { user, login, logout } = useContext(AuthContext);
  return (
    <>
      <button onClick={() => login("test", "Test123!")}>Log in</button>
      <button onClick={() => logout()}>Log out</button>
      <pre>{user ? JSON.stringify(user) : "undefined"}</pre>
    </>
  );
};

describe("AuthProvider", () => {
  it("should render a loading message whilst loading", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should provide a login function that logs a user in", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(sessionStorage.getItem("access_token")).toBeNull();
    expect(sessionStorage.getItem("refresh_token")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() =>
      expect(sessionStorage.getItem("access_token")).toBe("12345")
    );
    expect(sessionStorage.getItem("refresh_token")).toBe("ABCDE");
  });

  it("should provider a logout function that logs a user out", async () => {
    sessionStorage.setItem("access_token", "12345");
    sessionStorage.setItem("refresh_token", "ABCDE");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await screen.findByText(JSON.stringify({ name: "Grant" }));

    expect(sessionStorage.getItem("access_token")).toBe("12345");
    expect(sessionStorage.getItem("refresh_token")).toBe("ABCDE");

    fireEvent.click(screen.getByRole("button", { name: /log out/i }));

    expect(sessionStorage.getItem("access_token")).toBeNull();
    expect(sessionStorage.getItem("refresh_token")).toBeNull();
  });

  it("should provide user data", async () => {
    sessionStorage.setItem("access_token", "12345");
    sessionStorage.setItem("refresh_token", "ABCDE");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await screen.findByText(JSON.stringify({ name: "Grant" }));
  });
});
