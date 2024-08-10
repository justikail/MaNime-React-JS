import PropTypes from "prop-types";

function DetailStats({ data, setIsShow, isShow }) {
  return (
    <div className="detail-anime-stats">
      <h3 onClick={setIsShow}>
        Statistik <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
      </h3>
      {isShow && (
        <>
          <p>
            Score :{" "}
            <span>
              {data.score || "N/A"} / {(data.scored_by && data.scored_by.toLocaleString()) || "?"} User
            </span>
          </p>
          <p>
            Rank : <span>#{data.rank || "?"}</span>
          </p>
          <p>
            Popularitas : <span>#{(data.popularity && data.popularity.toLocaleString()) || "?"}</span>
          </p>
          <p>
            Member : <span>{(data.members && data.members.toLocaleString()) || "?"}</span>
          </p>
          <p>
            Favorit : <span>{(data.favorites && data.favorites.toLocaleString()) || "?"}</span>
          </p>
        </>
      )}
    </div>
  );
}

DetailStats.propTypes = {
  data: PropTypes.object,
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
};

export default DetailStats;
