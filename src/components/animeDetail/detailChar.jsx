import PropTypes from "prop-types";
import CharAv from "./char/char";
import { Link } from "react-router-dom";

function DetailChar({ id, title, isShow, setIsShow }) {
  return (
    <div className="detail-anime-character">
      <div className="detail-anime-character-head">
        <h2 onClick={setIsShow}>
          Karakter &amp; VA <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
        </h2>
        <Link to={`/detail/${id}/${title}/char`}>MORE</Link>
      </div>
      {isShow && <CharAv id={id} />}
    </div>
  );
}

DetailChar.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  isShow: PropTypes.bool,
  setIsShow: PropTypes.func,
};

export default DetailChar;
