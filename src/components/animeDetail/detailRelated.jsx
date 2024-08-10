import PropTypes from "prop-types";
import React from "react";

function DetailRelated({ data }) {
  return (
    <div className="detail-anime-related">
      <h2>Terkait</h2>
      {data.relations.length > 1 ? (
        data.relations
          .filter((relation) => relation.relation !== "Adaptation")
          .map((relation, index) => (
            <p key={index}>
              &nbsp;&nbsp;
              {relation.relation} :{" "}
              {relation.entry.length > 0 ? (
                relation.entry.map((entry, entryIndex) => (
                  <React.Fragment key={entry.mal_id}>
                    <a
                      href={`/detail/${entry.mal_id}/${entry.name
                        .toLowerCase()
                        .replace(/[^\w\s]/gi, "_")
                        .replace(/\s+/g, "_")}`}
                    >
                      {entry.name}
                    </a>
                    {entryIndex !== relation.entry.length - 1 && ", "}
                  </React.Fragment>
                ))
              ) : (
                <p>&nbsp; &nbsp;Tidak ada related anime ...</p>
              )}
            </p>
          ))
      ) : (
        <p>&nbsp; &nbsp;Tidak ada related anime ...</p>
      )}
    </div>
  );
}

DetailRelated.propTypes = {
  data: PropTypes.object,
};

export default DetailRelated;
