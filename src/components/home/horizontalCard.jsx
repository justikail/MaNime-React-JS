import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formattedTitle } from "../../utils/formatter";

function HorizontalCard({ anime }) {
  return (
    <div className="horizontal-view-card">
      <Link to={formattedTitle({ malId: anime.mal_id, title: anime.title })}>
        <img src={anime.images.webp.large_image_url} alt={anime.title} className="horizontal-view-image" loading="lazy" />
      </Link>
      <div className="horizontal-view-detail">
        <Link to={formattedTitle({ malId: anime.mal_id, title: anime.title })}>
          <h3 className="horizontal-view-name">{anime.title}</h3>
        </Link>
        <p className="horizontal-view-rate">
          &#11088;
          {anime.score ? anime.score : "N/A"}
          &nbsp;&nbsp;
          <i className="uil uil-user"></i>
          {anime.members.toLocaleString()}
        </p>
        <span className="horizontal-view-type">{anime.type}</span>
      </div>
    </div>
  );
}

HorizontalCard.propTypes = {
  anime: PropTypes.object,
};

export default HorizontalCard;
