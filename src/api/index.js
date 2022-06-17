const user = async (accessToken) =>
  new Promise((resolve) =>
    setInterval(() => resolve({ data: { name: "Grant" } }), 500)
  );

const login = async (email, password) =>
  new Promise((resolve) =>
    setInterval(
      () => resolve({ data: { accessToken: "12345", refreshToken: "ABCDE" } }),
      500
    )
  );

const api = { login, user };
export default api;