import AddPlayerPage from "./pages/player-management/AddPayer";
import EditPlayerPage from "./pages/player-management/EditPlayer";
import PlayerManagementPage from "./pages/player-management/PlayerManagementPage";
import PlayerSearchComponent from "./components/PlayerSearchDialog";
import StartPage from "./pages/StartPage";
import FAQPage from "./pages/static/FAQ";
import HowToPlayPage from "./pages/static/HowToPlay";
import ModeratorGuidePage from "./pages/static/ModeratorGuide";
import RolesPage from "./pages/static/Roles";
import TestPage from "./pages/TestPage";
import RolesManagement from "./pages/RolesManagement";
import SavedGames from "./pages/SavedGames";
import ArrangePlayers from "./pages/ArrangePlayers";
import RoleVitrine from "./pages/RoleVitrine";
import PlayerRolesAssignments from "./pages/PlayerRolesAssignment";
import SettingsPage from "./pages/SettingsPage";

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
    pathname: "/test",
    element: TestPage,
    title: "Test Page",
  }),
  LoadGame: () => ({
    pathname: "/load-game",
    element: SavedGames,
    title: "Load Game",
  }),
  ArrangePlayers: () => ({
    pathname: "/arrange-players",
    element: ArrangePlayers,
    title: "Arrange Players",
  }),
  ArrangeRoles: () => ({
    pathname: "/arrange-roles",
    element: RolesManagement,
    title: "Arrange Roles",
  }),
  PlayerRolesAssignments: () => ({
    pathname: "/player-roles-assignment",
    element: PlayerRolesAssignments,
    title: "Arrange Roles",
  }),
  RolesVitrine: () => ({
    pathname: "/roles-vitrine",
    element: RoleVitrine,
    title: "Roles Vitrine",
  }),
  OpeningDay: () => ({
    pathname: "/game/opening",
    element: () => null,
    title: "Opening Day",
  }),
    SettingsPage: () => ({
    pathname: "/settings-page",
    element: SettingsPage,
    title: "تنظیمات بازی",
  }),
};

const routes = Object.values(Pages);

export default routes;
