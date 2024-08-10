import PropTypes from "prop-types";
import Video from "./gallery/video";
import { Link } from "react-router-dom";
import { formattedTitle } from "../../utils/formatter";

function DetailGallery({ id, title, setIsShow, isShow }) {
  return (
    <div className="detail-anime-trailer">
      <div className="detail-anime-trailer-head">
        <h2 onClick={setIsShow}>
          Galeri <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
        </h2>
        <Link to={`${formattedTitle({ malId: id, title: title })}/gallery`}>MORE</Link>
      </div>
      {isShow && <Video id={id} />}
    </div>
  );
}

DetailGallery.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
};

export default DetailGallery;
