import { Link } from "react-router-dom";
import { formattedTitle } from "../../utils/formatter";
import PropTypes from "prop-types";
import { useFavorite } from "../../hooks/useFavoriteAnime";
import Ping from "../animation/ping";
import BtnFav from "../button/btnFav";

function VerticalCard({ anime }) {
  const { isFavorite, handleToggleFavorite, isLoading } = useFavorite({ anime: anime });

  return (
    <Link to={formattedTitle({ malId: anime.mal_id, title: anime.title })} className="vertical-view-card">
      <div className="vertical-view-card">
        <img src={anime.images.webp.large_image_url} alt={anime.title} className="vertical-view-image" loading="lazy" />
        <p className="vertical-view-title">{anime.title}</p>
        <span className="vertical-view-type">{anime.type}</span>
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
            tltipPlace={"bottom"}
            id={anime.mal_id}
          />
        )}
      </div>
    </Link>
  );
}

VerticalCard.propTypes = {
  anime: PropTypes.object,
};

export default VerticalCard;
