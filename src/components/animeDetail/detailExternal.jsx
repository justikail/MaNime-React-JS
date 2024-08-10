import PropTypes from "prop-types";

function DetailExternal({ data, setIsShow, isShow }) {
  return data.external && data.external.length > 0 ? (
    <div className="detail-anime-external">
      <h3 onClick={setIsShow}>
        External <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
      </h3>
      {isShow &&
        data.external.map((links, index) => (
          <p className="uil uil-link-h" key={index}>
            &nbsp;
            <a href={links.url} target="_black" rel="noreferrer">
              {links.name}
            </a>
          </p>
        ))}
    </div>
  ) : (
    ""
  );
}

DetailExternal.propTypes = {
  data: PropTypes.object,
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
};

export default DetailExternal;
