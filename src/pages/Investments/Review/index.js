import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ReviewTable } from "../../../components/ReviewTable";
import { useCallback, useState } from "react";

const switchFunds = async (portfolio, switchConfirmation) => {
  console.log(portfolio, switchConfirmation);
};

export const Review = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [switchConfirmation, setSwitchConfirmation] = useState(false);

  const { portfolio, policyNumber } = state;

  const onSubmit = async (event) => {
    event.preventDefault();
    await switchFunds(portfolio, switchConfirmation);
    navigate("confirmation", { state: { policyNumber } });
  };

  const onCancel = (event) => {
    event.preventDefault();
    navigate("/policy", {
      state: { policyNumber: state.policyNumber },
    });
  };

  const onCheck = useCallback(
    (event) => {
      setSwitchConfirmation(event.target.checked);
    },
    [setSwitchConfirmation]
  );

  const onEdit = (event) => {
    event.preventDefault();
    navigate("/policy/investments/available", { state });
  };

  if (!portfolio || !policyNumber) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form>
        <Link to="/policy" state={{ policyNumber }}>
          &lt; Back to policy
        </Link>
        <h1>Review your changes</h1>
        <p>Step 2 of 3</p>
        <h2>Your choices</h2>
        <button onClick={onEdit}>Edit</button>
        <ReviewTable portfolio={portfolio} />
        <h2>Confirmation</h2>
        <input
          type="checkbox"
          name="switch-confirmation"
          id="confirm-changes"
          checked={switchConfirmation}
          onChange={onCheck}
        />
        <label htmlFor="confirm-changes">
          I confirm that this is how I wish to invest my funds and that my
          future contributions to this pension policy will be allocated in this
          way
        </label>
        <div>
          <button onClick={onCancel}>&lt; Cancel</button>
          <button onClick={onSubmit} disabled={!switchConfirmation}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
