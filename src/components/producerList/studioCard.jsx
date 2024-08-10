import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formattedStudio } from "../../utils/formatter";

function StudioCard({ produser }) {
  return (
    <div className="produser-list-card">
      <Link to={formattedStudio({ malId: produser.mal_id, title: produser.titles[0].title })}>
        <img src={produser.images.jpg.image_url} alt={produser.titles[0].title} className="anime-list-image" loading="lazy" />
        <div className="anime-list-detail">
          <span>{produser.titles[0].title}</span>
          <p>{`${produser.established === null ? "?" : produser.established.split("T")[0]} (${produser.count.toLocaleString() || "?"})`}</p>
        </div>
        <span className="anime-list-status">
          <i className="uil uil-user"></i> {produser.favorites.toLocaleString() || "?"}
        </span>
      </Link>
    </div>
  );
}

StudioCard.propTypes = {
  produser: PropTypes.object,
};

export default StudioCard;
