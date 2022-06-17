import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { Login } from "./Login";
import { AccountOverview } from "./AccountOverview";
import { NotFound } from "./NotFound";

const App = () => {
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

export default App;
