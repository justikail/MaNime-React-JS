import NotFound from "./notFound";
import AnimeListSkeleton from "../components/animePaging/animeCardSkeleton";
import AnimeList from "../components/animePaging/animeCard";
import Pagination from "../components/animePaging/pagination";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useListSeason } from "../hooks/useAnimePaging";

function ListBySeason() {
  const { season, year } = useParams();
  const { data, loading, page, lastPage, handleNextPage, handlePrevPage } = useListSeason({ season: season, year: year });

  if (!loading && (!data || data.length === 0)) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>
          MaNime - Anime {season} {year}
        </title>
        <meta property="og:url" content="https://manime-reactjs.vercel.app/musim" />
        <meta property="og:title" content={`MaNime - Anime ${season} ${year}`} />
        <meta property="og:description" content={`Daftar anime yang yang tayang pada musim ${season} tahun ${year}. Diurutkan berdasarkan tanggal rilis.`} />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href={`https://manime-reactjs.vercel.app/musim/${season}/${year}`} />
      </Helmet>
      <section className="anime-list" id="seasonal-anime">
        <h1>
          Anime {season} {year}
        </h1>
        <div className="anime-list-container">
          {loading ? Array.from({ length: data.length > 0 ? data.length : 25 }).map((_, index) => <AnimeListSkeleton key={index} />) : data.map((anime, index) => <AnimeList anime={anime} key={`${anime.mal_id}${index}`} />)}
        </div>
        <Pagination page={page} lastPage={lastPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} loading={loading} />
      </section>
    </>
  );
}

export default ListBySeason;
