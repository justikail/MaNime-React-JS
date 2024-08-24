import PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";

function BtnFav({ onClick, isDisable, isFavorite, style, tltipPlace, id }) {
  const uniqueId = `fav${id}${Math.random().toString(36).substring(2, 9)}`;

  return (
    <>
      <button id={uniqueId} style={style} className={isFavorite ? "is-favorite" : "isnt-favorite"} onClick={onClick} disabled={isDisable} />
      <Tooltip anchorSelect={`#${uniqueId}`} id={uniqueId} place={tltipPlace} style={{ borderRadius: 8 }} opacity={1}>
        {isFavorite ? "Favorites" : "!Favorites"}
      </Tooltip>
    </>
  );
}

BtnFav.propTypes = {
  id: PropTypes.number,
  onClick: PropTypes.func,
  isDisable: PropTypes.bool,
  isFavorite: PropTypes.bool,
  style: PropTypes.object,
  tltipPlace: PropTypes.string,
};

export default BtnFav;
