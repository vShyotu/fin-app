import api from ".";

describe("user", () => {
  it("should fetch user data", async () => {
    const userData = await api.user("12345");

    expect(userData).toEqual({ data: { name: "Grant" } });
  });
});

describe("login", () => {
  it("should attempt to log the user in", async () => {
    const loginTokens = await api.login("User", "Test123");

    expect(loginTokens).toEqual({
      data: { accessToken: "12345", refreshToken: "ABCDE" },
    });
  });
});
