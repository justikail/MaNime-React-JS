import { useEffect, useState } from "react";
import { Fetch } from "../libs/fetch";

function useFetchAnimeList({ id }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const result = await Fetch({ endPoint: `/anime?order_by=start_date&sort=desc&producers=${id}&page=${page}` });
        setData((prevData) => [...prevData, ...result.data]);
        setLastPage(result.pagination.has_next_page);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchData();
          }, 5000);
        } else {
          console.error("Error fetching anime list: ", error);
          setLoading(false);
        }
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [id, page]);

  const handleLoad = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { data, loading, fetching, lastPage, handleLoad };
}

export default useFetchAnimeList;
