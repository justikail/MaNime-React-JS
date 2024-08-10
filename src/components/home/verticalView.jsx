import VerticalSkeleton from "./verticalSkeleton";
import VerticalCard from "./verticalCard";
import PropTypes from "prop-types";

function VerticalView({ title, fetchFunction }) {
  const { data, loading } = fetchFunction();

  return (
    <div className="vertical-view">
      <h2>{title}</h2>
      <div className="vertical-view-container">{loading ? Array.from({ length: 25 }).map((_, index) => <VerticalSkeleton key={index} />) : data.map((anime, index) => <VerticalCard key={`${anime.mal_id}${index}`} anime={anime} />)}</div>
    </div>
  );
}

VerticalView.propTypes = {
  title: PropTypes.string,
  fetchFunction: PropTypes.func,
};

export default VerticalView;
