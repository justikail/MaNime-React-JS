import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../context/favoriteContext";
import { auth } from "../libs/firebase";

function useFavorite({ anime }) {
  const { favoriteList, toggleFavorite, otherToggle, isLoading } = useContext(FavoriteContext);
  const navigate = useNavigate();
  const isFavorite = favoriteList.some((favorite) => favorite.animeId === anime.mal_id || favorite.animeId === anime.animeId);

  const handleToggleFavorite = () => {
    if (!auth.currentUser) {
      navigate("/signin");
    }
    toggleFavorite(anime);
  };

  const handleOtherToggle = () => {
    if (!auth.currentUser) {
      navigate("/signin");
    }
    otherToggle(anime);
  };

  return { isFavorite, handleToggleFavorite, handleOtherToggle, isLoading };
}

export { useFavorite };
