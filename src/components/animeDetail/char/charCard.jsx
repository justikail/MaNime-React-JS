import PropTypes from "prop-types";

function CharCard({ character }) {
  return (
    <div className="detail-anime-char">
      <img src={character.character.images.webp.image_url} alt={character.character.name} loading="lazy" />
      <div className="detail-anime-char-detail">
        <p>
          Name : <span>{character.character.name || "?"}</span>
        </p>
        {(character.voice_actors[0] && (
          <p>
            VA : <span>{character.voice_actors[0].person.name}</span>
          </p>
        )) || (
          <p>
            VA : <span>?</span>
          </p>
        )}
        <p>{character.role || "?"}</p>
      </div>
    </div>
  );
}

CharCard.propTypes = {
  character: PropTypes.object,
};

export default CharCard;
