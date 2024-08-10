import { Link } from "react-router-dom";
import { formattedTitle } from "../../utils/formatter";
import PropTypes from "prop-types";

function VerticalCard({ anime }) {
  return (
    <Link to={formattedTitle({ malId: anime.mal_id, title: anime.title })} className="vertical-view-card">
      <div className="vertical-view-card">
        <img src={anime.images.webp.large_image_url} alt={anime.title} className="vertical-view-image" loading="lazy" />
        <p className="vertical-view-title">{anime.title}</p>
        <span className="vertical-view-type">{anime.type}</span>
      </div>
    </Link>
  );
}

VerticalCard.propTypes = {
  anime: PropTypes.object,
};

export default VerticalCard;
