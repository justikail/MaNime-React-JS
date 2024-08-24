import PropTypes from "prop-types";
import { formattedTitle } from "../../../utils/formatter";
import { Tooltip } from "react-tooltip";

function SuggestCard({ suggestion }) {
  const uniqueId = `suggest-votes${suggestion.entry.mal_id}${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="detail-anime-suggest-card">
      <a href={formattedTitle({ malId: suggestion.entry.mal_id, title: suggestion.entry.title })}>
        <img src={suggestion.entry.images.webp.large_image_url} alt={suggestion.entry.title} className="horizontal-view-image" loading="lazy" />
      </a>
      <div className="detail-anime-suggest-detail">
        <a href={formattedTitle({ malId: suggestion.entry.mal_id, title: suggestion.entry.title })}>
          <h3 className="horizontal-view-name">{suggestion.entry.title}</h3>
        </a>
        <span id={uniqueId}>
          <i className="uil uil-user" /> {suggestion.votes.toLocaleString() || "?"}
        </span>
        <Tooltip place="right" anchorSelect={`#${uniqueId}`}>
          Total Votes
        </Tooltip>
      </div>
    </div>
  );
}

SuggestCard.propTypes = {
  suggestion: PropTypes.object,
};

export default SuggestCard;
