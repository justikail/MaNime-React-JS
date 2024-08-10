import { useEffect, useState } from "react";
import { Fetch } from "../libs/fetch";
import { translator } from "../utils/translator";

function useProducerDetail({ id }) {
  const [data, setData] = useState(null);
  const [translatedAbout, setTranslatedAbout] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchDetail = async () => {
      try {
        const result = await Fetch({ endPoint: `/producers/${id}/full` });
        setData(result.data);

        const aboutTranslated = await translator({ text: result.data.about });
        setTranslatedAbout(aboutTranslated);

        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchDetail();
          }, 5000);
        } else {
          console.error("Error fetching producer detail: ", error);
          setLoading(false);
        }
      }
    };

    fetchDetail();
  }, [id]);

  return { data, loading, translatedAbout };
}

export default useProducerDetail;
