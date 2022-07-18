import api from ".";

describe("user", () => {
  it("should fetch user data", async () => {
    sessionStorage.setItem("access_token", "12345");
    const userResponse = await api.user();
    const userData = await userResponse.json();

    expect(userData).toEqual({ name: "Grant" });
  });

  it("should not return anything if the api is called without an access token", async () => {
    sessionStorage.clear();

    const userResponse = await api.user();

    expect(userResponse).toBeUndefined();
  });
});

describe("login", () => {
  it("should attempt to log the user in", async () => {
    const loginResponse = await api.login("test", "Test123!");
    const tokens = await loginResponse.json();

    expect(tokens).toEqual({ accessToken: "12345", refreshToken: "ABCDE" });
  });
});
