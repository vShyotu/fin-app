import { Navigate, Route, Routes } from "react-router-dom";
import { UnauthedLayout } from "../../components/Unauthed/Layout";
import { Login } from "../../pages/Login";
import { NotFound } from "../../pages/NotFound";

export const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<UnauthedLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
