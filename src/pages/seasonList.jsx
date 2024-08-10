import SeasonCardSkeleton from "../components/seasonList/seasonCardSkeleton";
import SeasonCard from "../components/seasonList/seasonCard";
import { Helmet } from "react-helmet-async";
import { useSeasonList } from "../hooks/useAnimeData";

export default function SeasonList() {
  const { data, loading } = useSeasonList();

  return (
    <>
      <Helmet>
        <title>MaNime - Season List</title>
        <meta property="og:url" content="https://manime-reactjs.vercel.app/musim" />
        <meta property="og:title" content="MaNime - Season List" />
        <meta property="og:description" content="Daftar musim dan tahun perilisan anime." />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href="https://manime-reactjs.vercel.app/musim" />
      </Helmet>
      <section className="anime-list" id="season-list">
        <h1>Season List</h1>
        <div className="season-list-container">{loading ? Array.from({ length: 25 }).map((_, index) => <SeasonCardSkeleton key={index} />) : data.map((season, index) => <SeasonCard key={index} season={season} />)}</div>
      </section>
    </>
  );
}
