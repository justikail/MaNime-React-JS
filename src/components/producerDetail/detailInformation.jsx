import PropTypes from "prop-types";

function DetailInformation({ data, setIsShow, isShow }) {
  return (
    <div className="detail-anime-information">
      <h3 onClick={setIsShow}>
        Informasi <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
      </h3>
      {isShow && (
        <>
          <p>Synonym : {data.titles && data.titles.length > 2 ? <span>{data.titles[2].title}</span> : <span>?</span>}</p>
          <p>
            Berdiri : <span>{data.established === null ? "?" : data.established.split("T")[0]}</span>
          </p>
          <p>
            Penggemar : <span>{data.favorites.toLocaleString() || "?"}</span>
          </p>
          <p>
            Total : <span>{data.count.toLocaleString() || "?"} Anime</span>
          </p>
        </>
      )}
    </div>
  );
}

DetailInformation.propTypes = {
  data: PropTypes.object,
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
};

export default DetailInformation;
