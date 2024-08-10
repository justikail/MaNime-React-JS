import PropTypes from "prop-types";

function DetailSynopsis({ data, setIsShow, isShow, translatedSynopsis }) {
  return (
    <div className="detail-anime-synopsis">
      <h2 onClick={setIsShow}>
        Sinopsis <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
      </h2>
      {isShow && <p>&nbsp; &nbsp;{data.synopsis ? translatedSynopsis.split("[Ditulis oleh MAL Rewrite]")[0] : "Tidak ada sinopsis ..."}</p>}
    </div>
  );
}

DetailSynopsis.propTypes = {
  data: PropTypes.object,
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
  translatedSynopsis: PropTypes.string,
};

export default DetailSynopsis;
