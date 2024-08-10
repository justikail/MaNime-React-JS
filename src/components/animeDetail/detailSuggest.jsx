import PropTypes from "prop-types";
import Suggest from "./suggest/suggest";

function DetailSuggest({ isShow, setIsShow, id }) {
  return (
    <div className="detail-anime-suggest">
      <h2 onClick={setIsShow}>
        Rekomendasi <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
      </h2>
      {isShow && <Suggest id={id} />}
    </div>
  );
}

DetailSuggest.propTypes = {
  isShow: PropTypes.bool,
  setIsShow: PropTypes.func,
  id: PropTypes.string,
};

export default DetailSuggest;
