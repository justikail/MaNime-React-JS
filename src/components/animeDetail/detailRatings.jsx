import PropTypes from "prop-types";
function DetailRatings({ data }) {
  return (
    <div className="detail-anime-more">
      <p>
        Ranked #<span>{data.rank || "?"}</span>
      </p>
      <p>
        Popularity #<span>{(data.popularity && data.popularity.toLocaleString()) || "?"}</span>
      </p>
      <p>
        Members #<span>{(data.members && data.members.toLocaleString()) || "?"}</span>
      </p>
    </div>
  );
}

DetailRatings.propTypes = {
  data: PropTypes.object,
};

export default DetailRatings;
