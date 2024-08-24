import PropTypes from "prop-types";
import { useFavorite } from "../../hooks/useFavoriteAnime";
import { useGetColors } from "../../hooks/useGetColors";
import Ping from "../animation/ping";
import BtnFav from "../button/btnFav";

function DetailImage({ data }) {
  const { isFavorite, handleToggleFavorite, isLoading } = useFavorite({ anime: data });
  const { dominanColor, imgRef } = useGetColors({ image: data.images.webp.large_image_url });

  return (
    <div className="detail-anime-image">
      <img src={data.images.webp.large_image_url} alt={data.title} loading="lazy" ref={imgRef} crossOrigin="anonymous" />
      {isLoading ? <Ping /> : <BtnFav style={{ backgroundColor: dominanColor }} onClick={() => handleToggleFavorite(data)} isDisable={isLoading} isFavorite={isFavorite} tltipPlace={"top"} id={data.mal_id} />}
    </div>
  );
}

DetailImage.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default DetailImage;
