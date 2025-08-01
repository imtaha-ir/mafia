import StartPage from "./pages/StartPage";
import FAQPage from "./pages/static/FAQ";
import HowToPlayPage from "./pages/static/HowToPlay";
import ModeratorGuidePage from "./pages/static/ModeratorGuide";
import RolesPage from "./pages/static/Roles";

export const Pages = {
  StartPage: { pathname: "/", element: StartPage, title: "مافیا" },
  RolesPage: { pathname: "/roles", element: RolesPage, title: "نقش‌ها" },
  FAQPage: { pathname: "/faq", element: FAQPage, title: "پرسش‌های پرتکرار" },
  ModeratorGuidePage: {
    pathname: "/moderator-guide",
    element: ModeratorGuidePage,
    title: "راهنما",
  },
  HowToPlayPage: {
    pathname: "/how-to-play",
    element: HowToPlayPage,
    title: "راهنما",
  },
};

const routes = Object.values(Pages);

export default routes;
