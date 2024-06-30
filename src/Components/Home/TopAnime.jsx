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

const TopAnime = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await api.get("https://api.jikan.moe/v4/top/anime");
        setTopAnime(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchTopAnime();
          }, 5000);
        } else {
          console.error("Error fetching top anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchTopAnime();
  }, []);

  return (
    <section className="top-anime" id="top">
      <h1>Top Anime</h1>
      <div className="top-anime-container">
        {loading
          ? Array.from({ length: topAnime.length > 0 ? topAnime.length : 5 }).map((_, index) => (
              <div className="top-anime-card" key={index}>
                <Skeleton height={250} width={225} />
              </div>
            ))
          : topAnime.map((anime, index) => (
              <div className="top-anime-card" key={`${anime.mal_id}${index}`}>
                <Link
                  to={`/detail/${anime.mal_id}/${anime.title
                    .toLowerCase()
                    .replace(/[^\w\s]/gi, "_")
                    .replace(/\s+/g, "_")}`}
                >
                  <img src={anime.images.webp.large_image_url} alt={anime.title} className="top-anime-image" loading="lazy" />
                </Link>
                <div className="top-anime-detail">
                  <Link
                    to={`/detail/${anime.mal_id}/${anime.title
                      .toLowerCase()
                      .replace(/[^\w\s]/gi, "_")
                      .replace(/\s+/g, "_")}`}
                  >
                    <h3 className="top-anime-name">{anime.title}</h3>
                  </Link>
                  <p className="top-anime-rate">Rate : {anime.score} &#11088;</p>
                  <span className="top-anime-type">{anime.type}</span>
                </div>
              </div>
            ))}
        <Link to="/top" title="See More Top Anime" className="see-more">
          <span>S</span>
          <span>E</span>
          <span>E</span>
          <br />
          <span>M</span>
          <span>O</span>
          <span>R</span>
          <span>E</span>
        </Link>
      </div>
    </section>
  );
};

export default TopAnime;
