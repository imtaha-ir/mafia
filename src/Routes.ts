import AddPlayerPage from "./pages/player-management/AddPayer";
import EditPlayerPage from "./pages/player-management/EditPlayer";
import PlayerManagementPage from "./pages/player-management/PlayerManagementPage";
import PlayerSearchComponent from "./pages/player-management/PlayerSearch";
import StartPage from "./pages/StartPage";
import FAQPage from "./pages/static/FAQ";
import HowToPlayPage from "./pages/static/HowToPlay";
import ModeratorGuidePage from "./pages/static/ModeratorGuide";
import RolesPage from "./pages/static/Roles";

export const Pages = {
  StartPage: () => ({ pathname: "/", element: StartPage, title: "مافیا" }),
  RolesPage: () => ({
    pathname: "/roles",
    element: RolesPage,
    title: "نقش‌ها",
  }),
  FAQPage: () => ({
    pathname: "/faq",
    element: FAQPage,
    title: "پرسش‌های پرتکرار",
  }),
  ModeratorGuidePage: () => ({
    pathname: "/moderator-guide",
    element: ModeratorGuidePage,
    title: "راهنما",
  }),
  HowToPlayPage: () => ({
    pathname: "/how-to-play",
    element: HowToPlayPage,
    title: "راهنما",
  }),
  PlayerManagementPage: () => ({
    pathname: "/player-management",
    element: PlayerManagementPage,
    title: "Player Management",
  }),
  PlayerAddPage: () => ({
    pathname: "/player-management/add",
    element: AddPlayerPage,
    title: "New Player",
  }),
  PlayerEditPage: (id?: number) => ({
    pathname: `/player-management/edit/${id ?? ":id"}`,
    element: EditPlayerPage,
    title: "Edit Player",
  }),
  PlayerSearchPage: () => ({
    pathname: "/player-management/search",
    element: PlayerSearchComponent,
    title: "searc Player",
  }),
};

const routes = Object.values(Pages);

export default routes;
