import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";
import { useAuth } from "../contexts/useAuth";

const App = () => {
  const { user } = useAuth();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
