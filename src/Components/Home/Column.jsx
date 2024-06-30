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

const Column = () => {
  const [ongoingAnime, setOngoingAnime] = useState([]);
  const [completeAnime, setCompleteAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOngoingAnime = async () => {
      try {
        const response = await api.get("https://api.jikan.moe/v4/seasons/now?sfw=true&page=1");
        setOngoingAnime(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchOngoingAnime();
          }, 5000);
        } else {
          console.error("Error fetching ongoing anime: ", error);
          setLoading(false);
        }
      }
    };

    const fetchCompleteAnime = async () => {
      try {
        const japanTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" });
        const currentDate = new Date(japanTime);
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const current = currentDate.getDate();
        const formattedDate = `${currentYear}-${currentMonth}-${current}`.split("-");

        let year;
        let season;

        if (formattedDate[1] >= 12 || formattedDate[1] <= 3) {
          // winter
          if (formattedDate[1] === 3 && formattedDate[2] === 1) {
            year = `${currentYear - 1}`;
            season = "fall";
          } else {
            year = `${currentYear - 1}`;
            season = "fall";
          }
        } else if (formattedDate[1] >= 3 && formattedDate[1] <= 5) {
          // spring
          if (formattedDate[1] === 3 && formattedDate[2] >= 2) {
            year = `${currentYear}`;
            season = "winter";
          } else {
            year = `${currentYear}`;
            season = "winter";
          }
        } else if (formattedDate[1] >= 6 && formattedDate[1] <= 8) {
          // summer
          year = `${currentYear}`;
          season = "spring";
        } else {
          // fall
          year = `${currentYear}`;
          season = "summer";
        }

        const response = await api.get(`https://api.jikan.moe/v4/seasons/${year}/${season}?sfw=true&page=1`);
        setCompleteAnime(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchCompleteAnime();
          }, 5000);
        } else {
          console.error("Error fetching complete anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchCompleteAnime();
    fetchOngoingAnime();
  }, []);

  return (
    <section className="row-col-container">
      <div className="ongoing-anime" id="ongoing">
        <h2>On-going Anime</h2>
        <div className="ongoing-anime-container">
          {loading
            ? Array.from({ length: 25 }).map((_, index) => (
                <div className="ongoing-anime-card" key={index}>
                  <Skeleton height={230} width={155} />
                </div>
              ))
            : ongoingAnime.map((anime, index) => (
                <Link
                  to={`/detail/${anime.mal_id}/${anime.title
                    .toLowerCase()
                    .replace(/[^\w\s]/gi, "_")
                    .replace(/\s+/g, "_")}`}
                  className="complete-anime-card"
                  key={`${anime.mal_id}${index}`}
                >
                  <div className="ongoing-anime-card">
                    <img src={anime.images.webp.large_image_url} alt={anime.title} className="ongoing-anime-image" loading="lazy" />
                    <p className="ongoing-anime-title">{anime.title}</p>
                    <span className="ongoing-anime-type">{anime.type}</span>
                  </div>
                </Link>
              ))}
        </div>
      </div>

      <div className="complete-anime" id="complete">
        <h2>Complete Anime</h2>
        <div className="complete-anime-container">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div className="complete-anime-card" key={index}>
                  <Skeleton height={230} width={155} />
                </div>
              ))
            : completeAnime
                .filter((anime) => !anime.airing)
                .map((anime, index) => (
                  <Link
                    to={`/detail/${anime.mal_id}/${anime.title
                      .toLowerCase()
                      .replace(/[^\w\s]/gi, "_")
                      .replace(/\s+/g, "_")}`}
                    className="complete-anime-card"
                    key={`${anime.mal_id}${index}`}
                  >
                    <img src={anime.images.webp.large_image_url} alt={anime.title} className="complete-anime-image" loading="lazy" />
                    <p className="complete-anime-title">{anime.title}</p>
                    <span className="complete-anime-type">{anime.type}</span>
                  </Link>
                ))}
        </div>
      </div>
    </section>
  );
};

export default Column;
