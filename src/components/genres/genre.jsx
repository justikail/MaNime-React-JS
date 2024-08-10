import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formattedGenre } from "../../utils/formatter";
import { scrollToTop } from "../../hooks/useBackTop";

function Genre({ anime }) {
  return (
    <li className="genre-name">
      <Link to={formattedGenre({ malId: anime.mal_id, genreName: anime.name })} onClick={scrollToTop}>
        {anime.name}
      </Link>
    </li>
  );
}

Genre.propTypes = {
  anime: PropTypes.object,
};

export default Genre;
