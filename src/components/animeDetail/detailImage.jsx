import PropTypes from "prop-types";

function DetailImage({ data }) {
  return (
    <div className="detail-anime-image">
      <img src={data.images.webp.large_image_url} alt={data.title} loading="lazy" />
    </div>
  );
}

DetailImage.propTypes = {
  data: PropTypes.object,
};

export default DetailImage;
