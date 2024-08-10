import { Link } from "react-router-dom";

function FooterLinks() {
  return (
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
  );
}

export default FooterLinks;
