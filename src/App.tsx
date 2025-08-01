import { Route, Routes } from "react-router-dom";
import routes from "./Routes";

function App() {
  return (
    <Routes>
      {routes.map((r, rIndex) => {
        const route = r();
        return (
          <Route
            key={`route-${rIndex}`}
            path={route.pathname}
            element={<route.element />}
          ></Route>
        );
      })}
    </Routes>
  );
}

export default App;
