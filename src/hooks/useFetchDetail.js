import { useEffect, useState } from "react";
import { Fetch } from "../libs/fetch";
import { translator } from "../utils/translator";

function useFetchDetail({ endPoint }) {
  const [data, setData] = useState(null);
  const [translatedSynopsis, setTrnaslatedSynopsis] = useState("Loading...");
  const [translatedBackground, setTranslatedBackground] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [isRestricted, setIsRestricted] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchDetail = async () => {
      try {
        const result = await Fetch({ endPoint: endPoint });
        setData(result.data);

        const synopsisTranslated = await translator({ text: result.data.synopsis });
        setTrnaslatedSynopsis(synopsisTranslated);

        const backgroundTranslated = await translator({ text: result.data.background });
        setTranslatedBackground(backgroundTranslated);

        if (result.data.rating === "Rx - Hentai") {
          setIsRestricted(true);
        }

        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchDetail();
          }, 5000);
        } else {
          console.error("Error fetching detail anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchDetail();
  }, [endPoint]);

  return { data, loading, translatedSynopsis, translatedBackground, isRestricted };
}

export const useAnimeDetail = ({ id }) => useFetchDetail({ endPoint: `/anime/${id}/full` });
export const useAnimeRandom = () => useFetchDetail({ endPoint: "/random/anime" });

export default useFetchDetail;
