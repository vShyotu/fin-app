import { Route, Routes } from "react-router-dom";
import { AuthedLayout } from "../../components/Authed/Layout";
import { AccountOverview } from "../../pages/AccountOverview";
import { NotFound } from "../../pages/NotFound";

export const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<AuthedLayout />}>
        <Route index element={<AccountOverview />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
