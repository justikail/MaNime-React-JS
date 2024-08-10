import { useEffect } from "react";
import axios from "axios";
import { Search } from "../../libs/fetch";
import PropTypes from "prop-types";
import { formattedTitle } from "../../utils/formatter";

function SearchResults({ searchTerm, debouncedTerm, searchAnime, setSearchAnime, searching, setSearching, notFound, setNotFound }) {
  useEffect(() => {
    const source = axios.CancelToken.source();

    const getAnime = async () => {
      try {
        setSearching(true);
        const data = await Search({ endPoint: `/anime?unapproved&page=1&limit=5&q=${debouncedTerm}`, cancelToken: source.token });
        if (data.length === 0) {
          setNotFound(true);
        } else {
          setSearchAnime(data);
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
      getAnime();
    } else {
      setSearchAnime([]);
    }

    return () => {
      source.cancel("Request canceled by user");
    };
  }, [debouncedTerm, setSearchAnime, setNotFound, setSearching]);

  return (
    <>
      {searchTerm && (
        <div className="search-value">
          {searching ? (
            <p>Mencari anime &quot;{searchTerm}&quot;...</p>
          ) : notFound ? (
            <p>Anime tidak ditemukan</p>
          ) : (
            searchAnime.map((anime) => (
              <p key={anime.mal_id}>
                <a href={formattedTitle({ malId: anime.mal_id, title: anime.title })}>{anime.title}</a>
              </p>
            ))
          )}
        </div>
      )}
    </>
  );
}

SearchResults.propTypes = {
  searchTerm: PropTypes.string,
  debouncedTerm: PropTypes.string,
  searchAnime: PropTypes.array,
  setSearchAnime: PropTypes.func,
  searching: PropTypes.bool,
  setSearching: PropTypes.func,
  notFound: PropTypes.bool,
  setNotFound: PropTypes.func,
};

export default SearchResults;
