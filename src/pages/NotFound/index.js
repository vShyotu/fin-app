import { useNavigate } from "react-router-dom";
import { HoldingPage } from "../../components/HoldingPage";
import { useAuth } from "../../hooks/useAuth";

export const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const buttonOnClick = () => navigate("/");
  const button = <button onClick={buttonOnClick}>Back to your account</button>;

  return (
    <HoldingPage
      icon={<div>Icon</div>}
      title={"404 Not Found"}
      content={"This page could not be found"}
      button={user && button}
      showAdditionalSection={!user}
      additionalSectionTitle={"Need help?"}
      additionalSectionContent={
        <>
          Contact us on <a href="tel:+44800-123-1234">0123 123 1234</a>
        </>
      }
    />
  );
};
