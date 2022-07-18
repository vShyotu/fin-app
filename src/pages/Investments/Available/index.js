import { useMemo, useState, useRef, useCallback } from "react";
import { ChangeInvestmentsTable } from "../../../components/ChangeInvestmentsTable";
import { AvailableFundsTable } from "../../../components/AvailableFundsTable";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";

export const Available = () => {
  const headingRef = useRef();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [currentFunds] = useState([
    {
      name: "Fund 1",
      sedol: "FUND1",
      factsheet: "http://example-pdf.com/fund1",
      percentage: 100,
    },
  ]);

  const [availableFunds] = useState([
    {
      name: "Fund 1",
      sedol: "FUND1",
      factsheet: "http://example-pdf.com/fund1",
    },
    {
      name: "Fund 2",
      sedol: "FUND2",
      factsheet: "http://example-pdf.com/fund2",
    },
  ]);

  const [portfolio, setPortfolio] = useState([
    {
      name: "Fund 1",
      sedol: "FUND1",
      factsheet: "http://example-pdf.com/fund1",
      percentage: 100,
    },
  ]);

  const hasMadeChanges = useMemo(
    () => JSON.stringify(currentFunds) !== JSON.stringify(portfolio),
    [portfolio, currentFunds]
  );

  const [filter, setFilter] = useState("");

  const totalPercentage = useMemo(
    () => portfolio.reduce((pre, cur) => pre + cur.percentage, 0),
    [portfolio]
  );

  const investedAvailableFunds = useMemo(
    () =>
      availableFunds.map((fund) => ({
        ...fund,
        currentlyInvested: portfolio.some(({ sedol }) => fund.sedol === sedol),
      })),
    [availableFunds, portfolio]
  );

  const filteredAvailableFunds = useMemo(() => {
    if (!filter) return investedAvailableFunds;

    const filterLowerCase = filter.toLowerCase();
    return investedAvailableFunds.filter(
      ({ name, sedol }) =>
        sedol.toLowerCase().includes(filterLowerCase) ||
        name.toLowerCase().includes(filterLowerCase)
    );
  }, [investedAvailableFunds, filter]);

  const onUndoClick = (event) => {
    event.preventDefault();
    setPortfolio(JSON.parse(JSON.stringify(currentFunds)));
  };

  const onAddClick = (event) => {
    event.preventDefault();
    headingRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const onRemove = useCallback(
    (sedol) => {
      setPortfolio((portfolio) => {
        const removeFundIndex = portfolio.findIndex(
          (fund) => fund.sedol === sedol
        );
        const newPortfolio = JSON.parse(JSON.stringify(portfolio));
        newPortfolio.splice(removeFundIndex, 1);

        return newPortfolio;
      });
    },
    [setPortfolio]
  );

  const onChange = useCallback(
    (sedol, value) => {
      setPortfolio((portfolio) => {
        const editedFundIndex = portfolio.findIndex(
          (fund) => fund.sedol === sedol
        );
        const newPortfolio = JSON.parse(JSON.stringify(portfolio));
        newPortfolio[editedFundIndex].percentage = value;

        return newPortfolio;
      });
    },
    [setPortfolio]
  );

  const onAdd = useCallback(
    (sedol) => {
      const fundToAdd = availableFunds.find((fund) => fund.sedol === sedol);
      setPortfolio((portfolio) => [
        ...portfolio,
        { ...fundToAdd, percentage: 0 },
      ]);
    },
    [setPortfolio, availableFunds]
  );

  const onCancel = useCallback(
    (event) => {
      event.preventDefault();
      navigate("/policy", { state });
    },
    [navigate, state]
  );

  const onSubmit = useCallback(
    (event, portfolio) => {
      event.preventDefault();
      navigate("/policy/investments/review", {
        state: { ...state, portfolio },
      });
    },
    [navigate, state]
  );

  if (!state || !state.policyNumber) {
    return <Navigate to="/" />;
  }

  return (
    <form>
      <Link to="/policy" state={state} />
      <h1>Change funds</h1>
      <h2>Your funds</h2>
      <p>Step 1 of 3</p>

      <button onClick={onUndoClick} disabled={!hasMadeChanges}>
        Undo Changes
      </button>
      <button onClick={onAddClick}>Add a fund</button>

      <ChangeInvestmentsTable
        portfolio={portfolio}
        totalPercentage={totalPercentage}
        onRemove={onRemove}
        onChange={onChange}
      />

      <button onClick={onCancel}>&lt; Cancel</button>
      <button
        onClick={(event) => onSubmit(event, portfolio)}
        disabled={totalPercentage !== 100 || !hasMadeChanges}
      >
        Submit
      </button>

      <h2 ref={headingRef}>Available Funds</h2>

      <label htmlFor="funds-filter">Search for a fund: </label>
      <input
        type="text"
        id="funds-filter"
        value={filter}
        onChange={onFilterChange}
      />

      <AvailableFundsTable
        availableFunds={filteredAvailableFunds}
        onAdd={onAdd}
      />
    </form>
  );
};
