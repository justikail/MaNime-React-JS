import { useGenreList } from "../../hooks/useAnimeData";
import { useState } from "react";
import GenreSkeleton from "./genreSkeleton";
import Genre from "./genre";

function GenreList() {
  const { data, loading } = useGenreList();
  const [showGenreList, setShowGenreList] = useState(true);

  return (
    <section className="genre-list" id="genrelist">
      <h1
        onClick={() => {
          setShowGenreList(!showGenreList);
        }}
      >
        Genre List <i className={`uil ${showGenreList ? "uil-angle-up" : "uil-angle-down"}`}></i>
      </h1>
      {showGenreList && <ul className="genre-list-container">{loading ? <GenreSkeleton /> : data.map((anime, index) => <Genre anime={anime} key={index} />)}</ul>}
    </section>
  );
}

export default GenreList;
