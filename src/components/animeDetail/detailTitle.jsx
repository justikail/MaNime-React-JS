import PropTypes from "prop-types";

function DetailTitle({ data }) {
  return (
    <div className="detail-anime-title">
      <h1>{data.title}</h1>
      <h3>{data.title_english || data.title}</h3>
    </div>
  );
}

DetailTitle.propTypes = {
  data: PropTypes.object,
};

export default DetailTitle;
