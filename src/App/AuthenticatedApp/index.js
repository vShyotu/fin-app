import { Route, Routes } from "react-router-dom";
import { AuthedLayout } from "../../components/AuthedLayout";
import { AccountOverview } from "../../pages/AccountOverview";
import { InvestmentsAvailable } from "../../pages/Investments/Available";
import { NotFound } from "../../pages/NotFound";
import { Policy } from "../../pages/Policy";

export const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<AuthedLayout />}>
        <Route index element={<AccountOverview />} />
        <Route path="policy">
          <Route index element={<Policy />} />
          <Route path="investments">
            <Route path="available" element={<InvestmentsAvailable />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
