import CharCard from "./charCard";
import PropTypes from "prop-types";
import { useFetchChar } from "../../../hooks/useAnimeData";

function CharAv({ id }) {
  const { data, loading } = useFetchChar({ id: id });

  return (
    <div className="detail-anime-char-container">
      {loading ? <p style={{ textAlign: "center" }}>Loading...</p> : data && data.length > 0 ? data.slice(0, 9).map((character, index) => <CharCard key={index} character={character} />) : <p> &nbsp; &nbsp;Tidak ada karakter ...</p>}
    </div>
  );
}

CharAv.propTypes = {
  id: PropTypes.string,
};

export default CharAv;
