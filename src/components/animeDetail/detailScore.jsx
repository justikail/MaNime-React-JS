import PropTypes from "prop-types";

function DetailScore({ data }) {
  return (
    <div className="detail-anime-score">
      <h1>{data.score || "N/A"}</h1>
      <p>{(data.scored_by && data.scored_by.toLocaleString()) || "?"} USERS</p>
    </div>
  );
}

DetailScore.propTypes = {
  data: PropTypes.object,
};

export default DetailScore;
