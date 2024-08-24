import { Link } from "react-router-dom";
import { formattedTitle } from "../../utils/formatter";
import { mappingStatus } from "../../utils/mapping";
import { useFavorite } from "../../hooks/useFavoriteAnime";
import PropTypes from "prop-types";
import Ping from "../animation/ping";
import BtnFav from "../button/btnFav";

function DashboardAnime({ anime }) {
  const { isFavorite, handleOtherToggle, isLoading } = useFavorite({ anime: anime });

  return (
    <div className="anime-list-card">
      <Link to={formattedTitle({ malId: anime.animeId, title: anime.title })}>
        <img src={anime.img} alt={anime.title} loading="lazy" className="anime-list-image" />
        <div className="anime-list-detail">
          <span>{anime.title}</span>
          <p>
            {`${anime.type || "Unknown"}${anime.episode > 1 ? `(${anime.episode})` : ""}`} <i className="uil uil-star"></i> {anime.score || "N/A"} <i className="uil uil-user"></i> {anime.popularity.toLocaleString() || "?"}
          </p>
        </div>
        <span className="anime-list-status">{mappingStatus({ status: anime.status }) || "?"}</span>
        {isLoading ? (
          <Ping />
        ) : (
          <BtnFav
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleOtherToggle(anime);
            }}
            isDisable={isLoading}
            isFavorite={isFavorite}
            tltipPlace={"left"}
            id={anime.animeId}
          />
        )}
      </Link>
    </div>
  );
}

DashboardAnime.propTypes = {
  anime: PropTypes.object,
};

export default DashboardAnime;
