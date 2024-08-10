import SuggestCard from "./suggestCard";
import SuggestSkeleton from "./suggestSkeleton";
import PropTypes from "prop-types";
import { useFetchSuggest } from "../../../hooks/useAnimeData";

function Suggest({ id }) {
  const { data, loading } = useFetchSuggest({ id: id });

  return (
    <div className="horizontal-view-container">
      {loading ? (
        Array.from({ length: data.length > 0 ? data.length : 5 }).map((_, index) => <SuggestSkeleton key={index} />)
      ) : data && data.length > 0 ? (
        data.map((suggestion, index) => <SuggestCard key={`${suggestion.entry.mal_id}${index}`} suggestion={suggestion} />)
      ) : (
        <p>&nbsp; &nbsp;Tidak ada rekomendasi ...</p>
      )}
    </div>
  );
}

Suggest.propTypes = {
  id: PropTypes.string,
};

export default Suggest;
