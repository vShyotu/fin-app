import { Route, Routes } from "react-router-dom";
import { AuthedLayout } from "../../components/AuthedLayout";
import { AccountOverview } from "../../pages/AccountOverview";
import { Available } from "../../pages/Investments/Available";
import { Review } from "../../pages/Investments/Review";
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
            <Route path="available" element={<Available />} />
            <Route path="review" element={<Review />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
