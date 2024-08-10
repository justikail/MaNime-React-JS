import HorizontalView from "../components/home/horizontalView";
import VerticalView from "../components/home/verticalView";
import { useTopAnime, usePopularAnime, useOnGoing, useCompleteAnime, usePopularNow, useTopUpcoming } from "../hooks/useAnimeData";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>MaNime - Home</title>
        <meta property="og:url" content="https://manime-reactjs.vercel.app/" />
        <meta property="og:title" content="MaNime - Home" />
        <meta property="og:description" content="MaNime adalah website penyedia informasi seputar anime, seperti anime terbaru, anime terpopuler, rekomendasi anime, dan lainnya." />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href="https://manime-reactjs.vercel.app/" />
      </Helmet>
      <HorizontalView title="Top Anime" fetchFunction={useTopAnime} goTo="/top" />
      <HorizontalView title="Populer Anime" fetchFunction={usePopularAnime} goTo="/popular" />
      <section className="row-col-container">
        <VerticalView title="On-going Anime" fetchFunction={useOnGoing} id="ongoing" />
        <VerticalView title="Complete Anime" fetchFunction={useCompleteAnime} id="complete" />
      </section>
      <HorizontalView title="Populer Musim Ini" fetchFunction={usePopularNow} goTo="/popnow" />
      <HorizontalView title="Dinantikan" fetchFunction={useTopUpcoming} goTo="/upcoming" />
    </>
  );
}