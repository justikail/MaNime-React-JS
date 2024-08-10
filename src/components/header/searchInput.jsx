import { useEffect } from "react";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import PropTypes from "prop-types";

function SearchInput({ searchTerm, setSearchTerm, setDebouncedTerm, setNotFound }) {
  const debouncedTerm = useDebouncedValue(searchTerm, 500);

  useEffect(() => {
    setDebouncedTerm(debouncedTerm);
  }, [debouncedTerm, setDebouncedTerm]);

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
    setNotFound(false);
  };

  return (
    <>
      <label htmlFor="search" className="uil uil-search"></label>
      <input id="search" name="q" type="search" placeholder="Telusuri anime" className="header-search" title="Cari Anime" value={searchTerm} onChange={handleInput} />
    </>
  );
}

SearchInput.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  setDebouncedTerm: PropTypes.func,
  setNotFound: PropTypes.func,
};

export default SearchInput;
