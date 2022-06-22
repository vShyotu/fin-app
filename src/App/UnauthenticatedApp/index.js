import { Navigate, Route, Routes } from "react-router-dom";
import { UnauthedLayout } from "../../components/Unauthed/Layout";
import { Login } from "../../pages/Login";

export const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<UnauthedLayout />}>
        <Route index path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
};
