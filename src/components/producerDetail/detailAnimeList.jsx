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
          {["TV", "ONA", "OVA", "Movie", ""].map((t) => (
            <button key={t} type="button" onClick={() => setFilter(t)} style={{ backgroundColor: filter == t ? "#333" : "#030303" }}>
              {t.toUpperCase() || "ALL"}
            </button>
          ))}
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
