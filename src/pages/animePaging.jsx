import AnimeListSkeleton from "../components/animePaging/animeCardSkeleton";
import AnimeList from "../components/animePaging/animeCard";
import Pagination from "../components/animePaging/pagination";
import PropTypes from "prop-types";
import { FavoriteProvider } from "../context/favoriteContext";
import { Helmet } from "react-helmet-async";

export default function AnimePaging({ title, id, fetchFunction, path, desc }) {
  const { data, loading, page, lastPage, handleNextPage, handlePrevPage } = fetchFunction();

  return (
    <>
      <Helmet>
        <title>{`MaNime - ${title}`}</title>
        <meta property="og:url" content={`https://manime-reactjs.vercel.app/${path}`} />
        <meta property="og:title" content={`MaNime - ${title}`} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href={`https://manime-reactjs.vercel.app/${path}`} />
      </Helmet>
      <FavoriteProvider loading={loading}>
        <section className="anime-list" id={id}>
          <h1>{title}</h1>
          <div className="anime-list-container">
            {loading ? Array.from({ length: data.length > 0 ? data.length : 25 }).map((_, index) => <AnimeListSkeleton key={index} />) : data.map((anime, index) => <AnimeList anime={anime} key={`${anime.mal_id}${index}`} />)}
          </div>
          <Pagination page={page} lastPage={lastPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} loading={loading} />
        </section>
      </FavoriteProvider>
    </>
  );
}

AnimePaging.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  fetchFunction: PropTypes.func,
  path: PropTypes.string,
  desc: PropTypes.string,
};
