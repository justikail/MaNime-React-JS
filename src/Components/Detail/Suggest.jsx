import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

const Suggest = (props) => {
  const [suggest, setSuggest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggest = async () => {
      try {
        const response = await api.get(`https://api.jikan.moe/v4/anime/${props.id}/recommendations`);
        setSuggest(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchSuggest();
          }, 5000);
        } else {
          console.error("Error fetching recommendation anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchSuggest();
  }, [props.id]);

  return (
    <div className="detail-anime-suggest-container">
      {loading ? (
        Array.from({ length: suggest.length > 0 ? suggest.length : 5 }).map((_, index) => (
          <div className="detail-anime-suggest-card" key={index}>
            <Skeleton height={250} width={225} />
          </div>
        ))
      ) : suggest && suggest.length > 0 ? (
        suggest.map((suggestion, index) => (
          <div className="detail-anime-suggest-card" key={`${suggestion.entry.mal_id}${index}`}>
            <a
              href={`/detail/${suggestion.entry.mal_id}/${suggestion.entry.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, "_")
                .replace(/\s+/g, "_")}`}
              onClick={() => setLoading(true)}
            >
              <img src={suggestion.entry.images.webp.large_image_url} alt={suggestion.entry.title} className="detail-anime-suggest-image" loading="lazy" />
            </a>
            <div className="detail-anime-suggest-detail">
              <a
                href={`/detail/${suggestion.entry.mal_id}/${suggestion.entry.title
                  .toLowerCase()
                  .replace(/[^\w\s]/gi, "_")
                  .replace(/\s+/g, "_")}`}
              >
                <h3 className="detail-anime-suggest-name">{suggestion.entry.title}</h3>
              </a>
            </div>
          </div>
        ))
      ) : (
        <p>&nbsp; &nbsp;Tidak ada rekomendasi ...</p>
      )}
    </div>
  );
};

export default Suggest;
