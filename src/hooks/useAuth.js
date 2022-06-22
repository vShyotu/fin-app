import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("No AuthProvider or being used outside of the AuthProvider");
  }

  return context;
};
