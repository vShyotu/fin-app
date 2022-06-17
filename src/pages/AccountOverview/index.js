import { useAuth } from "../../contexts/useAuth";

export const AccountOverview = () => {
  const { user } = useAuth();

  return (
    <>
      <h1>Account overview</h1>
      <p>Hi {user.name}</p>
    </>
  );
};
