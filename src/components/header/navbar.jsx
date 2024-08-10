import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul className="navbar-category">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="/detail">Anime List</a>
        </li>
        <li>
          <Link to="/producer">Produser List</Link>
        </li>
        <li>
          <Link to="/jadwal">Jadwal Harian</Link>
        </li>
        <li>
          <a href="/musim">Jadwal Musiman</a>
        </li>
        <li>
          <a href="/top">Top Anime</a>
        </li>
        <li>
          <a href="/popular">Populer Anime</a>
        </li>
        <li>
          <a href="/ongoing">On-going Anime</a>
        </li>
        <li>
          <a href="/complete">Complete Anime</a>
        </li>
        <li>
          <a href="/popnow">Populer Musim Ini</a>
        </li>
        <li>
          <a href="/upcoming">Dinantikan</a>
        </li>
        <li>
          <a href="/random">Random Anime</a>
        </li>
        <li>
          <a href="#genrelist">Genre list</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
