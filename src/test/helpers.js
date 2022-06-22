import { MemoryRouter } from "react-router-dom";

export const withMemoryRouter = (Component, initialEntries) => (props) =>
  (
    <MemoryRouter initialEntries={initialEntries}>
      <Component {...props} />
    </MemoryRouter>
  );
