import PropTypes from "prop-types";

function DetailAbout({ data, setIsShow, isShow, translatedAbout }) {
  return (
    <div className="studio-about">
      <h2 onClick={setIsShow}>
        Deskripsi <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
      </h2>
      {isShow && <>{data.about === null ? <p>&nbsp; &nbsp;Tidak ada deskripsi ...</p> : <p>&nbsp; &nbsp;{translatedAbout}</p>}</>}
    </div>
  );
}

DetailAbout.propTypes = {
  data: PropTypes.object,
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
  translatedAbout: PropTypes.string,
};

export default DetailAbout;
