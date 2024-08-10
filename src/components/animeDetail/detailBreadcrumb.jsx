import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Breadcrumb({ paths }) {
  return (
    <ol className="breadcrumb">
      {paths.map((path, index) => (
        <li className="breadcrumb-item" key={index}>
          {index === paths.length - 1 ? path.title : <Link to={path.link}>{path.title}</Link>}
        </li>
      ))}
    </ol>
  );
}

Breadcrumb.propTypes = {
  paths: PropTypes.array,
};

export default Breadcrumb;
