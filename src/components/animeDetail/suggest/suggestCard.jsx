import PropTypes from "prop-types";
import { formattedTitle } from "../../../utils/formatter";

function SuggestCard({ suggestion }) {
  return (
    <div className="detail-anime-suggest-card">
      <a href={formattedTitle({ malId: suggestion.entry.mal_id, title: suggestion.entry.title })}>
        <img src={suggestion.entry.images.webp.large_image_url} alt={suggestion.entry.title} className="horizontal-view-image" loading="lazy" />
      </a>
      <div className="detail-anime-suggest-detail">
        <a href={formattedTitle({ malId: suggestion.entry.mal_id, title: suggestion.entry.title })}>
          <h3 className="horizontal-view-name">{suggestion.entry.title}</h3>
        </a>
      </div>
    </div>
  );
}

SuggestCard.propTypes = {
  suggestion: PropTypes.object,
};

export default SuggestCard;
