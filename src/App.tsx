import { Route, Routes } from "react-router-dom";
import routes from "./Routes";

function App() {
  return (
    <Routes>
      {routes.map((r, rIndex) => (
        <Route
          key={`route-${rIndex}`}
          path={r.pathname}
          element={<r.element />}
        />
      ))}
    </Routes>
  );
}

export default App;
