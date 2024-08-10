import HorizontalSkeleton from "./horizontalSkeleton";
import { Link } from "react-router-dom";
import HorizontalCard from "./horizontalCard";
import PropTypes from "prop-types";

function HorizontalView({ title, fetchFunction, goTo }) {
  const { data, loading } = fetchFunction();

  return (
    <section className="horizontal-view" id={goTo.replace("/", "")}>
      <h1>{title}</h1>
      <div className="horizontal-view-container">
        {loading ? Array.from({ length: 5 }).map((_, index) => <HorizontalSkeleton key={index} />) : data.map((anime, index) => <HorizontalCard key={`${anime.mal_id}${index}`} anime={anime} />)}
        <Link to={goTo} title="See More" className="see-more">
          <span>S</span>
          <span>E</span>
          <span>E</span>
          <br />
          <span>M</span>
          <span>O</span>
          <span>R</span>
          <span>E</span>
        </Link>
      </div>
    </section>
  );
}

HorizontalView.propTypes = {
  title: PropTypes.string,
  fetchFunction: PropTypes.func,
  goTo: PropTypes.string,
};

export default HorizontalView;
