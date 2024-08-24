import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { auth, db } from "../libs/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import PropTypes from "prop-types";

const FavoriteContext = createContext();

const FavoriteProvider = ({ children, loading }) => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const docRef = doc(db, "users", userId);
    setIsLoading(true);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setFavoriteList(docSnap.data().animeList);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching favorite list: ", error);
        setIsLoading(false);
      }
    );

    if (!loading) {
      return () => unsubscribe();
    }
  }, [userId, loading]);

  const toggleFavorite = useCallback(
    async (anime) => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      const docRef = doc(db, "users", userId);
      const animeData = {
        animeId: anime.mal_id,
        episode: anime.episodes || null,
        img: anime.images.webp.large_image_url,
        popularity: anime.members || null,
        rating: anime.score || null,
        status: anime.status || null,
        title: anime.title,
        type: anime.type || null,
      };
      setIsLoading(true);

      try {
        if (favoriteList.some((favorite) => favorite.animeId === anime.mal_id)) {
          await updateDoc(docRef, {
            animeList: arrayRemove(animeData),
          });
          setIsLoading(false);
        } else {
          await updateDoc(docRef, {
            animeList: arrayUnion(animeData),
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error updating favorite list: ", error);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, favoriteList]
  );

  const otherToggle = useCallback(
    async (anime) => {
      setIsLoading(true);
      if (!userId) {
        setIsLoading(false);
        return;
      }

      const docRef = doc(db, "users", userId);
      const animeData = {
        animeId: anime.animeId,
        episode: anime.episode || null,
        img: anime.img,
        popularity: anime.popularity || null,
        rating: anime.rating || null,
        status: anime.status || null,
        title: anime.title,
        type: anime.type || null,
      };
      setIsLoading(true);

      try {
        if (favoriteList.some((favorite) => favorite.animeId === anime.animeId)) {
          await updateDoc(docRef, {
            animeList: arrayRemove(animeData),
          });
          setIsLoading(false);
        } else {
          await updateDoc(docRef, {
            animeList: arrayUnion(animeData),
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error updating favorite list: ", error);
      } finally {
        setIsLoading(false);
      }
    },
    [userId, favoriteList]
  );

  const value = useMemo(
    () => ({
      favoriteList,
      toggleFavorite,
      otherToggle,
      isLoading,
    }),
    [favoriteList, toggleFavorite, otherToggle, isLoading]
  );

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};

FavoriteProvider.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};

export { FavoriteProvider, FavoriteContext };
