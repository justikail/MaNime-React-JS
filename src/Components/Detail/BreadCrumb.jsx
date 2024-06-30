import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ paths }) => {
  return (
    <ol className="breadcrumb">
      {paths.map((path, index) => (
        <li className="breadcrumb-item" key={index}>
          {index === paths.length - 1 ? path.title : <Link to={path.link}>{path.title}</Link>}
        </li>
      ))}
    </ol>
  );
};

export default Breadcrumb;
