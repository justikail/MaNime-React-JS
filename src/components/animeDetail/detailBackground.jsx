import PropTypes from "prop-types";

function DetailBackground({ data, setIsShow, isShow, translatedBackground }) {
  return (
    <div className="detail-anime-background">
      <h2 onClick={setIsShow}>
        Background <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
      </h2>
      {isShow && <p>&nbsp; &nbsp;{data.background ? translatedBackground : "Tidak ada background ..."}</p>}
    </div>
  );
}

DetailBackground.propTypes = {
  data: PropTypes.object,
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
  translatedBackground: PropTypes.string,
};

export default DetailBackground;
