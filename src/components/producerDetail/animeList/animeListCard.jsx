import { Link } from "react-router-dom";
import { formattedTitle } from "../../../utils/formatter";
import { mappingStatus } from "../../../utils/mapping";
import PropTypes from "prop-types";

function AnimeListCard({ anime }) {
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
      </Link>
    </div>
  );
}

AnimeListCard.propTypes = {
  anime: PropTypes.object,
};

export default AnimeListCard;
