import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { setupCache } from "axios-cache-adapter";
import { Link } from "react-router-dom";

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

const AnimeList = (props) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        setFetching(true);
        const response = await api.get(`https://api.jikan.moe/v4/anime?order_by=start_date&sort=desc&producers=${props.id}&page=${page}`);
        setAnimeList((prevData) => [...prevData, ...response.data.data]);
        setLastPage(response.data.pagination.has_next_page);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchAnimeList();
          }, 5000);
        } else {
          console.error("Error fetching anime list: ", error);
          setLoading(false);
        }
      } finally {
        setFetching(false);
      }
    };

    fetchAnimeList();
  }, [props.id, page]);

  const handleLoad = () => {
    setPage((prevPage) => page + 1);
  };

  const mappingStatus = (status) => {
    switch (status) {
      case "Finished Airing":
        return "Selesai";
      case "Currently Airing":
        return "Tayang";
      case "Airing":
        return "Tayang";
      case "Not yet aired":
        return "Mendatang";
      case "Cancelled":
        return "Dibatalkan";
      case "Hiatus":
        return "Hiatus";
      case "Unknown":
        return "?";
      default:
        return status;
    }
  };

  return (
    <>
      <div className="studio-animelist-container">
        {loading
          ? Array.from({ length: 25 }).map((_, index) => (
              <div className="studio-animelist-card" key={index}>
                <Skeleton height={295} width="100%" />
              </div>
            ))
          : props.filter
          ? animeList
              .filter((anime) => anime.type === props.filter)
              .map((anime, index) => (
                <div className="studio-animelist-card" key={`${anime.mal_id}${index}`}>
                  <Link
                    to={`/detail/${anime.mal_id}/${anime.title
                      .toLowerCase()
                      .replace(/[^\w\s]/gi, "_")
                      .replace(/\s+/g, "_")}`}
                  >
                    <img src={anime.images.webp.large_image_url} alt={anime.title} className="studio-animelist-image" loading="lazy" />
                    <div className="studio-animelist-detail">
                      <span>{anime.title}</span>
                      <p>
                        {`${anime.type || "Unknown"}${anime.episodes > 1 ? `(${anime.episodes})` : ""}`} <i className="uil uil-star"></i> {anime.score || "N/A"} <i className="uil uil-user"></i> {anime.members.toLocaleString() || "?"}
                      </p>
                    </div>
                    <span className="studio-animelist-status">{mappingStatus(anime.status) || "?"}</span>
                  </Link>
                </div>
              ))
          : animeList.map((anime, index) => (
              <div className="studio-animelist-card" key={`${anime.mal_id}${index}`}>
                <Link
                  to={`/detail/${anime.mal_id}/${anime.title
                    .toLowerCase()
                    .replace(/[^\w\s]/gi, "_")
                    .replace(/\s+/g, "_")}`}
                >
                  <img src={anime.images.webp.large_image_url} alt={anime.title} className="studio-animelist-image" loading="lazy" />
                  <div className="studio-animelist-detail">
                    <span>{anime.title}</span>
                    <p>
                      {`${anime.type || "Unknown"}${anime.episodes > 1 ? `(${anime.episodes})` : ""}`} <i className="uil uil-star"></i> {anime.score || "N/A"} <i className="uil uil-user"></i> {anime.members.toLocaleString() || "?"}
                    </p>
                  </div>
                  <span className="studio-animelist-status">{mappingStatus(anime.status) || "?"}</span>
                </Link>
              </div>
            ))}
      </div>
      <button className="load-more" onClick={handleLoad} disabled={lastPage === false} style={{ backgroundColor: lastPage === false ? "#333" : "#030303" }}>
        {fetching ? <div className="spinner"></div> : "Load More"}
      </button>
    </>
  );
};

export default AnimeList;
