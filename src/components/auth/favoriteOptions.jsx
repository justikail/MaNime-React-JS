import PropTypes from "prop-types";

function FavoriteOptions({ children, title }) {
  return (
    <div className="toggle-options">
      <h1>{title}</h1>
      {children}
    </div>
  );
}

FavoriteOptions.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
export default FavoriteOptions;
