import { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./searchInput";
import SearchResults from "./searchResults";
import Navbar from "./navbar";
import { useScroll } from "../../hooks/useScroll";

function Header() {
  const isScrolled = useScroll();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAnime, setSearchAnime] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  return (
    <header>
      <div className={`header-container ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-start">
          <img src="/img/icon.png" alt="MaNime Icon" className="header-icon" />
          <Link to="/" className="header-title">
            MaNime
          </Link>
        </div>

        <div className="header-end">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} setDebouncedTerm={setDebouncedTerm} setNotFound={setNotFound} />
          <SearchResults searchTerm={searchTerm} debouncedTerm={debouncedTerm} searchAnime={searchAnime} setSearchAnime={setSearchAnime} searching={searching} setSearching={setSearching} notFound={notFound} setNotFound={setNotFound} />
        </div>
      </div>

      <Navbar />
    </header>
  );
}

export default Header;
