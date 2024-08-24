import AnimeListSkeleton from "../components/animePaging/animeCardSkeleton";
import AnimeList from "../components/animePaging/animeCard";
import Pagination from "../components/animePaging/pagination";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useListByGenre } from "../hooks/useAnimePaging";
import { FavoriteProvider } from "../context/favoriteContext";

export default function ListByGenre() {
  const { id, title } = useParams();
  const { data, loading, page, lastPage, handleNextPage, handlePrevPage } = useListByGenre({ id: id });
  const navigate = useNavigate();

  if (!loading && (!data || data.length === 0)) {
    return navigate("/404");
  }

  return (
    <>
      <Helmet>
        <title>MaNime - Genre {title.replaceAll("_", " ")}</title>
        <meta property="og:url" content={`https://manime-reactjs.vercel.app/genre/${id}/${title}`} />
        <meta property="og:title" content={`MaNime - Genre ${title.replaceAll("_", " ")}`} />
        <meta property="og:description" content={`Daftar anime dengan genre ${title.replaceAll("_", " ")}. Yang diurutkan berdasarkan anime terbaru.`} />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href={`https://manime-reactjs.vercel.app/genre/${id}/${title}`} />
      </Helmet>
      <FavoriteProvider loading={loading}>
        <section className="anime-list" id="list-genre">
          <h1>Genre : {title.replaceAll("_", " ")}</h1>
          <div className="anime-list-container">
            {loading ? (
              Array.from({ length: data.length > 0 ? data.length : 25 }).map((_, index) => <AnimeListSkeleton key={index} />)
            ) : id === "12" ? (
              <p>Puasa Bro ...</p>
            ) : (
              data.map((anime, index) => <AnimeList anime={anime} key={`${anime.mal_id}${index}`} />)
            )}
          </div>
          <Pagination page={page} lastPage={lastPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} loading={loading} />
        </section>
      </FavoriteProvider>
    </>
  );
}
