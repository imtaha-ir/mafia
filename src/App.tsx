import { Route, Routes } from "react-router-dom";
import RolesPage from "./pages/static/Roles";
import FAQPage from "./pages/static/FAQ";
import ModeratorGuidePage from "./pages/static/ModeratorGuide";
import HowToPlayPage from "./pages/static/HowToPlay";
import StartPage from "./pages/StartPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/roles" element={<RolesPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/moderator-guide" element={<ModeratorGuidePage />} />
      <Route path="/how-to-play" element={<HowToPlayPage />} />
    </Routes>
  );
}

export default App;
