import PropTypes from "prop-types";

function Pagination({ page, lastPage, handleNextPage, handlePrevPage, loading }) {
  return (
    <div className="count-page">
      <button className="prev-page" onClick={handlePrevPage} disabled={page === 1 || loading} style={{ backgroundColor: page === 1 ? "#333" : "#101010" }}>
        Prev
      </button>
      <p> {page} </p>
      <button className="next-page" onClick={handleNextPage} disabled={!lastPage || loading} style={{ backgroundColor: !lastPage ? "#333" : "#101010" }}>
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  lastPage: PropTypes.bool,
  handleNextPage: PropTypes.func,
  handlePrevPage: PropTypes.func,
  loading: PropTypes.bool,
};

export default Pagination;
