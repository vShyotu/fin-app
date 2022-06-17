import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form>
      <h1>Log in</h1>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <button
        onClick={(e) => {
          e.preventDefault();
          login(email, password);
          navigate("/");
        }}
      >
        Log in
      </button>
    </form>
  );
};
