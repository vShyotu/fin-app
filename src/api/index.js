import { utf8_to_b64 } from "../utils/base64";

const user = async () => {
  const accessToken = sessionStorage.getItem("access_token");

  if (!accessToken) {
    return;
  }

  return await fetch("/user", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

const login = async (email, password) => {
  const base64UserPass = `${utf8_to_b64(email)}:${utf8_to_b64(password)}`;
  const authorizationHeader = `Basic ${base64UserPass}`;
  console.log("Auth header (login):", authorizationHeader);

  const headers = new Headers();
  headers.append("Authorization", authorizationHeader);

  return await fetch("/login", {
    method: "POST",
    headers,
  });
};

const api = { login, user };
export default api;
