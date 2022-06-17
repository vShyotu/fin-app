import { useNavigate } from "react-router-dom";
import { HoldingPageLayout } from "../../components/HoldingPage";

export const NotFound = () => {
  const navigate = useNavigate();
  const isLoggedIn = false;
  const hasHistory = window.history.state && window.history.state.idx > 0;

  const buttonOnClick = () =>
    hasHistory ? navigate(-1) : navigate("/", { replace: true });
  const buttonLabel = hasHistory ? "Go back" : "Go home";
  const button = <button onClick={buttonOnClick}>{buttonLabel}</button>;

  return (
    <HoldingPageLayout
      icon={<div>Icon</div>}
      title={"404 Not Found"}
      content={"This page could not be found"}
      button={button}
      showAdditionalSection={isLoggedIn}
      additionalSectionTitle={"Need help?"}
      additionalSectionContent={
        <>
          Contact us on <a href="tel:+44800-123-1234">0800 123 1234</a>
        </>
      }
    />
  );
};
