import { useState, useEffect } from "react";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { Link } from "react-router-dom";

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchValue, setShowSearchValue] = useState(false);
  const [searchAnime, setSearchAnime] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearching(true);
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchSearchAnime = async () => {
      try {
        setSearching(true);
        const response = await api.get(`https://api.jikan.moe/v4/anime?sfw&unapproved&page=1&limit=5&q=${debouncedTerm}`, {
          cancelToken: source.token,
        });
        if (response.data.data.length === 0) {
          setNotFound(true);
        } else {
          setSearchAnime(response.data.data);
          setNotFound(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching Search anime: ", error);
        }
      } finally {
        setSearching(false);
      }
    };

    if (debouncedTerm) {
      fetchSearchAnime();
    } else {
      setSearchAnime([]);
    }

    return () => {
      source.cancel("Request canceled by user");
    };
  }, [debouncedTerm]);

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
    setShowSearchValue(event.target.value !== "");
    setNotFound(false);
  };

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
          <label htmlFor="search" className="uil uil-search"></label>
          <input id="search" name="q" type="search" placeholder="Telusuri anime" className="header-search" title="Cari Anime" value={searchTerm} onChange={handleInput} />
          {showSearchValue && (
            <div className="search-value">
              {searching ? (
                <p>Mencari anime &quot;{searchTerm}&quot;...</p>
              ) : notFound ? (
                <p>Anime tidak ditemukan</p>
              ) : (
                searchAnime.map((anime) => (
                  <p key={anime.mal_id}>
                    <a
                      href={`/detail/${anime.mal_id}/${anime.title
                        .toLowerCase()
                        .replace(/[^\w\s]/gi, "_")
                        .replace(/\s+/g, "_")}`}
                    >
                      {anime.title}
                    </a>
                  </p>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <nav>
        <ul className="navbar-category">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/detail">Anime List</Link>
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
            <Link to="/top">Top Anime</Link>
          </li>
          <li>
            <Link to="/popular">Populer Anime</Link>
          </li>
          <li>
            <Link to="/ongoing">On-going Anime</Link>
          </li>
          <li>
            <Link to="/complete">Complete Anime</Link>
          </li>
          <li>
            <Link to="/popnow">Populer Musim Ini</Link>
          </li>
          <li>
            <Link to="/upcoming">Dinantikan</Link>
          </li>
          <li>
            <a href="/random">Random Anime</a>
          </li>
          <li>
            <a href="#genrelist">Genre list</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
