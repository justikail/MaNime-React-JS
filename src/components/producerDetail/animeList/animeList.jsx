import AnimeListSkeleton from "./animeListSkeleton";
import AnimeListCard from "./animeListCard";
import PropTypes from "prop-types";
import useFetchAnimeList from "../../../hooks/useFetchAnimeList";

function AnimeList({ id, filter }) {
  const { data, loading, fetching, lastPage, handleLoad } = useFetchAnimeList({ id: id });

  return (
    <>
      <div className="studio-animelist-container">
        {loading
          ? Array.from({ length: 25 }).map((_, index) => <AnimeListSkeleton key={index} />)
          : filter
          ? data.filter((anime) => anime.type === filter).map((anime, index) => <AnimeListCard anime={anime} key={`${anime.mal_id}${index}`} />)
          : data.map((anime, index) => <AnimeListCard anime={anime} key={`${anime.mal_id}${index}`} />)}
      </div>
      <button className="load-more" onClick={handleLoad} disabled={lastPage === false} style={{ backgroundColor: lastPage === false ? "#333" : "#030303" }}>
        {fetching ? <div className="spinner"></div> : "Load More"}
      </button>
    </>
  );
}

AnimeList.propTypes = {
  id: PropTypes.string,
  filter: PropTypes.string,
};

export default AnimeList;
