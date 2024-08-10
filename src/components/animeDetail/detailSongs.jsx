import PropTypes from "prop-types";

function DetailSongs({ data, isShow, setIsShow }) {
  return (
    <div className="detail-anime-song">
      <h2 onClick={setIsShow}>
        Soundtrack <i className={`uil ${isShow ? "uil-angle-down" : "uil-angle-down"}`}></i>
      </h2>
      {isShow && (
        <>
          <div className="detail-anime-song-category">
            <h3>Opening</h3>
            <h3>Ending</h3>
          </div>
          <div className="detail-anime-song-container">
            <div className="detail-anime-song-op">
              {data.theme.openings && data.theme.openings.length > 0 ? (
                data.theme.openings.map((opening, index) => (
                  <div className="opening-name" key={index}>
                    <a href={`https://www.youtube.com/results?search_query=${opening}`} rel="noreferrer" target="_blank">
                      {opening}
                    </a>
                  </div>
                ))
              ) : (
                <p>Tidak ada opening ...</p>
              )}
            </div>

            <div className="detail-anime-song-ed">
              {data.theme.endings && data.theme.endings.length > 0 ? (
                data.theme.endings.map((ending, index) => (
                  <div className="ending-name" key={index}>
                    <a href={`https://www.youtube.com/results?search_query=${ending}`} rel="noreferrer" target="_blank">
                      {ending}
                    </a>
                  </div>
                ))
              ) : (
                <p>Tidak ada ending ...</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

DetailSongs.propTypes = {
  data: PropTypes.object,
  isShow: PropTypes.bool,
  setIsShow: PropTypes.func,
};

export default DetailSongs;
