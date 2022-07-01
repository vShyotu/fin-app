import { Route, Routes } from "react-router-dom";
import { AuthedLayout } from "../../components/Authed/Layout";
import { AccountOverview } from "../../pages/AccountOverview";
import { NotFound } from "../../pages/NotFound";
import { Policy } from "../../pages/Policy";

export const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<AuthedLayout />}>
        <Route index element={<AccountOverview />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
