import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Login } from "../../pages/Login";

export const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
};
