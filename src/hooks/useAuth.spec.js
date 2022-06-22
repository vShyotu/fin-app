import { renderHook } from "@testing-library/react";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "./useAuth";

const mockAuthContext = {
  login: jest.fn(),
  logout: jest.fn(),
  user: { name: "Grant" },
};

describe("useAuth hook", () => {
  it("should provide the auth context", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={mockAuthContext}>
          {children}
        </AuthContext.Provider>
      ),
    });

    expect(result.current).toBe(mockAuthContext);
  });

  it("should throw an error if used outside of an auth context", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    let error;

    try {
      renderHook(() => useAuth());
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(
      Error("No AuthProvider or being used outside of the AuthProvider")
    );
  });
});
