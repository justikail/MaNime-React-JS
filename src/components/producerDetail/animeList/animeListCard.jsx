import { Link } from "react-router-dom";
import { formattedTitle } from "../../../utils/formatter";
import { mappingStatus } from "../../../utils/mapping";
import { useFavorite } from "../../../hooks/useFavoriteAnime";
import PropTypes from "prop-types";
import Ping from "../../animation/ping";
import BtnFav from "../../button/btnFav";

function AnimeListCard({ anime }) {
  const { isFavorite, handleToggleFavorite, isLoading } = useFavorite({ anime: anime });

  return (
    <div className="anime-list-card">
      <Link
        to={formattedTitle({
          malId: anime.mal_id,
          title: anime.title,
        })}
      >
        <img src={anime.images.webp.large_image_url} alt={anime.title} className="anime-list-image" loading="lazy" />
        <div className="anime-list-detail">
          <span>{anime.title}</span>
          <p>
            {`${anime.type || "Unknown"}${anime.episodes > 1 ? `(${anime.episodes})` : ""}`} <i className="uil uil-star"></i> {anime.score || "N/A"} <i className="uil uil-user"></i> {anime.members.toLocaleString() || "?"}
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
              handleToggleFavorite(anime);
            }}
            isDisable={isLoading}
            isFavorite={isFavorite}
            tltipPlace={"left"}
            id={anime.mal_id}
          />
        )}
      </Link>
    </div>
  );
}

AnimeListCard.propTypes = {
  anime: PropTypes.object,
};

export default AnimeListCard;
