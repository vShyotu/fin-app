import api from ".";

describe("user", () => {
  it("should fetch user data", async () => {
    sessionStorage.setItem("access_token", "12345");
    const userResponse = await api.user();
    const userData = await userResponse.json();

    expect(userData).toEqual({ name: "Grant" });
  });
});

describe("login", () => {
  it("should attempt to log the user in", async () => {
    const loginResponse = await api.login("test", "test123");
    const tokens = await loginResponse.json();

    expect(tokens).toEqual({ accessToken: "12345", refreshToken: "ABCDE" });
  });
});
