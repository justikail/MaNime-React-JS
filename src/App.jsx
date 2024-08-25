import Layout from "./Layout.jsx";
import Home from "./pages/home";
import NotFound from "./pages/notFound.jsx";
import AnimePaging from "./pages/animePaging.jsx";
import ListByGenre from "./pages/listByGenre.jsx";
import ListProducer from "./pages/listProducer.jsx";
import ListBySchedule from "./pages/listBySchedule.jsx";
import SeasonList from "./pages/seasonList.jsx";
import ListBySeason from "./pages/listBySeason.jsx";
import AnimeDetail from "./pages/animeDetail.jsx";
import RandomAnime from "./pages/randomAnime.jsx";
import ProducerDetail from "./pages/producerDetail.jsx";
import Signin from "./pages/signIn.jsx";
import Signup from "./pages/signUp.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { useAnimeList, useTopAnime, usePopularAnime, useOngoingAnime, useCompleteAnime, usePopularNow, useUpcoming } from "./hooks/useAnimePaging";
import { PrivateRoute, PublicRoute } from "./components/auth/authRoute.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const route = [
    { path: "/", element: <Home /> },
    { path: "/top", element: <AnimePaging title="Top Anime" fetchFunction={useTopAnime} desc="Daftar top anime berdasarkan score atau rating." /> },
    { path: "/popular", element: <AnimePaging title="Populer Anime" fetchFunction={usePopularAnime} desc="Daftar anime populer berdasarkan jumlah penggemar." /> },
    { path: "/ongoing", element: <AnimePaging title="On-Going Anime" fetchFunction={useOngoingAnime} desc="Daftar anime yang sedang tayang." /> },
    { path: "/complete", element: <AnimePaging title="Complete Anime" fetchFunction={useCompleteAnime} desc="Daftar anime yang telah selesai tayang." /> },
    { path: "/popnow", element: <AnimePaging title="Populer Musim Ini" fetchFunction={usePopularNow} desc="Daftar anime populer musim ini." /> },
    { path: "/upcoming", element: <AnimePaging title="Dinantikan Anime" fetchFunction={useUpcoming} desc="Daftar anime yang akan tayang." /> },
    { path: "/detail", element: <AnimePaging title="Anime List" fetchFunction={useAnimeList} desc="Daftar anime terbaru." /> },
    { path: "/producer", element: <ListProducer /> },
    { path: "/jadwal", element: <ListBySchedule /> },
    { path: "/musim", element: <SeasonList /> },
    { path: "/random", element: <RandomAnime /> },
    { path: "/signin", element: <Signin />, public: true },
    { path: "/signup", element: <Signup />, public: true },
    { path: "/client", element: <Dashboard />, private: true },
    { path: "/musim/:season/:year", element: <ListBySeason /> },
    { path: "/detail/:id/:title", element: <AnimeDetail /> },
    { path: "/genre/:id/:title", element: <ListByGenre /> },
    { path: "/producer/:id/:title", element: <ProducerDetail /> },
    { path: "*", element: <NotFound /> },
  ];

  const renderRoute = (routes) =>
    routes.map(({ path, element, private: isPrivate, public: isPublic }) => {
      const component = <Layout>{element}</Layout>;

      if (isPrivate) {
        return <Route key={path} path={path} element={<PrivateRoute>{component}</PrivateRoute>} />;
      }

      if (isPublic) {
        return <Route key={path} path={path} element={<PublicRoute>{component}</PublicRoute>} />;
      }

      return <Route key={path} path={path} element={component} />;
    });

  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Router>
          <Routes>{renderRoute(route)}</Routes>
        </Router>
      </SkeletonTheme>
      <Analytics />
    </>
  );
}
