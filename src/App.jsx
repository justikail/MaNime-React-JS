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
import { PrivateRoute, PublicRoute } from "./components/auth/authRoute.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { Analytics } from "@vercel/analytics/react";
import { useAnimeList, useTopAnime, usePopularAnime, useOngoingAnime, useCompleteAnime, usePopularNow, useUpcoming } from "./hooks/useAnimePaging";

export default function App() {
  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Router>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/top"
              element={
                <Layout>
                  <AnimePaging title="Top Anime" id="top-anime" fetchFunction={useTopAnime} path="top" desc="Daftar top anime yang diurutkan berdasarkan jumlah score atau rating yang didapatkan." />
                </Layout>
              }
            />
            <Route
              path="/popular"
              element={
                <Layout>
                  <AnimePaging title="Populer Anime" id="popular-anime" fetchFunction={usePopularAnime} path="/popular" desc="Daftar anime populer yang diurutkan berdasarkan jumlah penggemar." />
                </Layout>
              }
            />
            <Route
              path="/ongoing"
              element={
                <Layout>
                  <AnimePaging title="On-Going Anime" id="ongoing-anime" fetchFunction={useOngoingAnime} path="/ongoing" desc="Daftar anime yang sedang tayang yang diurutkan berdasarkan anime terbaru." />
                </Layout>
              }
            />
            <Route
              path="/complete"
              element={
                <Layout>
                  <AnimePaging title="Complete Anime" id="complete-anime" fetchFunction={useCompleteAnime} path="/complete" desc="Daftar anime yang telah selesai tayang yang diurutkan berdasarkan penayangan terakhir." />
                </Layout>
              }
            />
            <Route
              path="/popnow"
              element={
                <Layout>
                  <AnimePaging title="Populer Musim Ini" id="popular-now" fetchFunction={usePopularNow} path="/popnow" desc="Daftar anime yang tayang musim ini yang diurutkan berdasarkan jumlah score atau rating yang didapatkan." />
                </Layout>
              }
            />
            <Route
              path="/upcoming"
              element={
                <Layout>
                  <AnimePaging title="Dinantikan Anime" id="upcoming-anime" fetchFunction={useUpcoming} path="/upcoming" desc="Daftar anime yang akan tayang kedepannya. Diurutkan berdasarkan jumlah penggemar yang didapatkan." />
                </Layout>
              }
            />
            <Route
              path="/detail"
              element={
                <Layout>
                  <AnimePaging title="Anime List" id="anime-list" fetchFunction={useAnimeList} path="detail" desc="Daftar anime yang diurutkan berdasarkan anime terbaru." />
                </Layout>
              }
            />
            <Route
              path="/producer"
              element={
                <Layout>
                  <ListProducer />
                </Layout>
              }
            />
            <Route
              path="/jadwal"
              element={
                <Layout>
                  <ListBySchedule />
                </Layout>
              }
            />
            <Route
              path="/musim"
              element={
                <Layout>
                  <SeasonList />
                </Layout>
              }
            />
            <Route
              path="/random"
              element={
                <Layout>
                  <RandomAnime />
                </Layout>
              }
            />
            <Route
              path="/signin"
              element={
                <PublicRoute>
                  <Layout>
                    <Signin />
                  </Layout>
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Layout>
                    <Signup />
                  </Layout>
                </PublicRoute>
              }
            />
            <Route
              path="/client"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/musim/:season/:year"
              element={
                <Layout>
                  <ListBySeason />
                </Layout>
              }
            />
            <Route
              path="/detail/:id/:title"
              element={
                <Layout>
                  <AnimeDetail />
                </Layout>
              }
            />
            <Route
              path="/genre/:id/:title"
              element={
                <Layout>
                  <ListByGenre />
                </Layout>
              }
            />
            <Route
              path="/producer/:id/:title"
              element={
                <Layout>
                  <ProducerDetail />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </SkeletonTheme>
      <Analytics />
    </>
  );
}
