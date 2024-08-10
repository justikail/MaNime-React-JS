import PropTypes from "prop-types";

function DetailImage({ data }) {
  return (
    <div className="detail-anime-image">
      <img src={data.images.jpg.image_url} alt={data.titles[0].title} loading="lazy" />
    </div>
  );
}

DetailImage.propTypes = {
  data: PropTypes.object,
};

export default DetailImage;
