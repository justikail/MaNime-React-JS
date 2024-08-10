import PropTypes from "prop-types";

function DetailTitle({ data }) {
  return (
    <div className="detail-anime-title">
      <h1>{data.titles[0].title}</h1>
      <h3>{data.titles && data.titles.length > 2 ? data.titles[2].title : ""}</h3>
    </div>
  );
}

DetailTitle.propTypes = {
  data: PropTypes.object,
};

export default DetailTitle;
