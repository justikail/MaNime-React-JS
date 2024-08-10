import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function SeasonCard({ season }) {
  return (
    <div className="season-list-card">
      <div className="season-list-year">
        <span>{season.year.toString()[0]}</span>
        <span>{season.year.toString()[1]}</span>
        <span>{season.year.toString()[2]}</span>
        <span>{season.year.toString()[3]}</span>
      </div>

      <div className="season-list-season">
        {season.seasons.map((musim, index) => (
          <Link to={`/musim/${musim}/${season.year}`} key={`${season.year}${index}`}>
            {musim}
          </Link>
        ))}
      </div>
    </div>
  );
}

SeasonCard.propTypes = {
  season: PropTypes.object,
};

export default SeasonCard;
