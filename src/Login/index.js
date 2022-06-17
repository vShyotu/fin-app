import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <form>
      <h1>Log in</h1>
      <label>
        Email:
        <input type="email" />
      </label>

      <label>
        Password:
        <input type="password" />
      </label>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Log in
      </button>
    </form>
  );
};
