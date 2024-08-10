import { useState, useEffect } from "react";
import { Fetch } from "../libs/fetch";
import { scrollToTop } from "./useBackTop";

function useAnimePaging({ endPoint }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await Fetch({ endPoint: `${endPoint}&page=${page} ` });
        setData(result.data);
        setLastPage(result.pagination.has_next_page);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchData();
          }, 5000);
        } else {
          console.error(`Error fetching data from ${page}: `, error);
          setLoading(false);
        }
      }
    };

    fetchData();
    scrollToTop();
  }, [endPoint, page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setLoading(true);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    setLoading(true);
  };

  return { data, loading, page, lastPage, handleNextPage, handlePrevPage };
}

export const useAnimeList = () => useAnimePaging({ endPoint: "/anime?order_by=end_date&sort=desc&sfw=true" });
export const useTopAnime = () => useAnimePaging({ endPoint: "/top/anime?sfw=true" });
export const usePopularAnime = () => useAnimePaging({ endPoint: "/top/anime?sfw=true&filter=bypopularity" });
export const useOngoingAnime = () => useAnimePaging({ endPoint: "/seasons/now?sfw=true" });
export const useCompleteAnime = () => useAnimePaging({ endPoint: "/anime?sfw=true&status=complete&order_by=end_date&sort=desc&limit=25" });
export const usePopularNow = () => useAnimePaging({ endPoint: "/anime?sfw=true&status=airing&min_score=7&order_by=score&sort=desc" });
export const useUpcoming = () => useAnimePaging({ endPoint: "/anime?sfw=true&status=upcoming&order_by=members&sort=desc" });
export const useListByGenre = ({ id }) => useAnimePaging({ endPoint: `/anime?sfw=true&genres=${id}&order_by=end_date&sort=desc` });
export const useListProducer = () => useAnimePaging({ endPoint: "/producers?order_by=favorites&sort=desc" });
export const useListSchedule = ({ day }) => useAnimePaging({ endPoint: `/schedules?sfw=true&filter=${day}` });
export const useListSeason = ({ season, year }) => useAnimePaging({ endPoint: `/seasons/${year}/${season}?sfw=true` });

export default useAnimePaging;
