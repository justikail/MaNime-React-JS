import PropTypes from "prop-types";

function DetailStream({ data, setIsShow, isShow }) {
  return data.streaming && data.streaming.length > 0 ? (
    <div className="detail-anime-streaming">
      <h3 onClick={setIsShow}>
        Streaming <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
      </h3>
      {isShow &&
        data.streaming.map((stream, index) => (
          <p className="uil uil-link-h" key={index}>
            &nbsp;
            <a href={stream.url} target="_blank" rel="noreferrer">
              {stream.name}
            </a>
          </p>
        ))}
    </div>
  ) : (
    ""
  );
}

DetailStream.propTypes = {
  data: PropTypes.object,
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
};

export default DetailStream;
