import PropTypes from "prop-types";
import AnimeList from "./animeList/animeList";

function DetailAnimeList({ setIsShow, isShow, filter, setFilter, id }) {
  return (
    <div className="studio-animelist">
      <div className="studio-animelist-head">
        <h2 onClick={setIsShow}>
          Anime <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
        </h2>

        <div className="studio-animelist-filter">
          <button data-value="tv" onClick={() => setFilter("TV")}>
            TV
          </button>
          <button data-value="ona" onClick={() => setFilter("ONA")}>
            ONA
          </button>
          <button data-value="ova" onClick={() => setFilter("OVA")}>
            OVA
          </button>
          <button data-value="movie" onClick={() => setFilter("Movie")}>
            MOVIE
          </button>
          <button data-value="other" onClick={() => setFilter("")}>
            OTHER
          </button>
        </div>
      </div>
      {isShow && <AnimeList id={id} filter={filter} />}
    </div>
  );
}

DetailAnimeList.propTypes = {
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  id: PropTypes.string,
};

export default DetailAnimeList;
