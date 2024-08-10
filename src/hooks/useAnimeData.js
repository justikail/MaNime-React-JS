import { useEffect, useState } from "react";
import { Fetch } from "../libs/fetch";
import { year, season } from "../utils/currentDate";

function useAnimeData({ endPoint }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await Fetch({ endPoint: endPoint });
        setData(result.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchData();
          }, 5000);
        } else {
          console.error(`Error fetching data from ${endPoint}: `, error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [endPoint]);

  return { data, loading };
}

export const useTopAnime = () => useAnimeData({ endPoint: "/top/anime" });
export const usePopularNow = () => useAnimeData({ endPoint: "/anime?sfw=true&status=airing&min_score=7&order_by=score&sort=desc&page=1" });
export const usePopularAnime = () => useAnimeData({ endPoint: "/top/anime?sfw=true&filter=bypopularity&page=1" });
export const useTopUpcoming = () => useAnimeData({ endPoint: "/anime?sfw=true&page=1&status=upcoming&order_by=members&sort=desc" });
export const useOnGoing = () => useAnimeData({ endPoint: "/seasons/now?sfw=true&page=1" });
export const useCompleteAnime = () => useAnimeData({ endPoint: `/seasons/${year}/${season}?sfw=true&page=1` });
export const useGenreList = () => useAnimeData({ endPoint: "/genres/anime" });
export const useSeasonList = () => useAnimeData({ endPoint: "/seasons" });
export const useFetchChar = ({ id }) => useAnimeData({ endPoint: `/anime/${id}/characters` });
export const useFetchSuggest = ({ id }) => useAnimeData({ endPoint: `/anime/${id}/recommendations` });

export default useAnimeData;
