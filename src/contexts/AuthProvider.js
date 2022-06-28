import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialiseUserFromToken = async () => {
      const accessToken = sessionStorage.getItem("access_token");

      if (!accessToken) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const userResponse = await api.user(accessToken);
      const user = await userResponse.json();

      setUser(user);
      setLoading(false);
    };

    initialiseUserFromToken();
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const login = async (email, password) => {
    setLoading(true);

    const loginResponse = await api.login(email, password);
    const tokens = await loginResponse.json();
    const { accessToken, refreshToken } = tokens;

    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);

    const userResponse = await api.user(accessToken);
    const user = await userResponse.json();

    setUser(user);
    setLoading(false);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
