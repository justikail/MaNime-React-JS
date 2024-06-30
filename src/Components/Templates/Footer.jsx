import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="special-thanks">
        <img src="//irfandahir.files.wordpress.com/2017/05/jikan.png" alt="Jikan API" rel="nofollow" title="Jikan API" />
      </div>
      <footer>
        <div className="footer-container">
          <div className="footer-start">
            <img src="/img/icon.png" alt="Footer Icon" className="footer-icon" />
            <img src="/img/MaNime-white.png" alt="Footer Icon" className="footer-icon" />
            <img src="/img/MaNime-black.png" alt="Footer Icon" className="footer-icon" />
            <div className="footer-about">
              <h1>
                MaNime<span>.</span>
              </h1>
              <p>&nbsp;MaNime adalah website yang menyediakan informasi mengenai anime populer, ongoing, dan rekomendasi anime. Website MaNime masih dalam tahap pengembangan untuk fitur lainnya.</p>
            </div>
          </div>

          <div className="footer-end">
            <div className="footer-navbar">
              <h1>LINKS</h1>
              <div className="links">
                <Link to="/" className="footer-links">
                  Home
                </Link>
                <Link to="/top" className="footer-links">
                  Top Anime
                </Link>
                <Link to="/popular" className="footer-links">
                  Populer Anime
                </Link>
                <Link to="/ongoing" className="footer-links">
                  On-going Anime
                </Link>
                <Link to="/complete" className="footer-links">
                  Complete Anime
                </Link>
                <Link to="/popnow" className="footer-links">
                  Populer Musim Ini
                </Link>
                <Link to="/upcoming" className="footer-links">
                  Dinantikan
                </Link>
              </div>
            </div>
          </div>
        </div>

        <span className="footer-copyright">
          &copy; 2023 MaNime - Created With ❤️ By <a href="https://github.com/justikail"> Justikail</a>
        </span>
      </footer>
    </>
  );
};

export default Footer;
