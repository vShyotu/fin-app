import { Route, Routes } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Login } from "../../pages/Login";
import { AccountOverview } from "../../pages/AccountOverview";
import { NotFound } from "../../pages/NotFound";

export const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<AccountOverview />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
