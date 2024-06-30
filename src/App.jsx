import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { Analytics } from "@vercel/analytics/react";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import Top from "./Pages/Top";
import Popular from "./Pages/Popular";
import OnGoing from "./Pages/OnGoing.jsx";
import Complete from "./Pages/Complete.jsx";
import PopNow from "./Pages/PopNow.jsx";
import TopUp from "./Pages/Upcoming.jsx";
import Genre from "./Pages/Genre.jsx";
import NotFound from "./Pages/NotFound.jsx";
import StudioProducers from "./Pages/StudioProducers.jsx";
import Anime from "./Pages/Anime.jsx";
import Producer from "./Pages/Producer.jsx";
import Schedule from "./Pages/Schedule.jsx";
import Season from "./Pages/Season.jsx";
import SeasonList from "./Pages/SeasonList.jsx";
import Random from "./Pages/Random.jsx";

const App = () => {
  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Router>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/top" element={<Top />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/ongoing" element={<OnGoing />} />
            <Route path="/complete" element={<Complete />} />
            <Route path="/popnow" element={<PopNow />} />
            <Route path="/upcoming" element={<TopUp />} />
            <Route path="/detail" element={<Anime />} />
            <Route path="/producer" element={<Producer />} />
            <Route path="/jadwal" element={<Schedule />} />
            <Route path="/musim" element={<SeasonList />} />
            <Route path="/random" element={<Random />} />
            <Route path="/musim/:season/:year" element={<Season />} />
            <Route path="/detail/:id/:title" element={<Detail />} />
            <Route path="/genre/:id/:title" element={<Genre />} />
            <Route path="/producer/:id/:title" element={<StudioProducers />} />
          </Routes>
        </Router>
      </SkeletonTheme>
      <Analytics />
    </>
  );
};

export default App;
