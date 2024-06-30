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

const PopularAnime = () => {
  const [popularAnime, setPopularAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularAnime = async () => {
      try {
        const response = await api.get("https://api.jikan.moe/v4/top/anime?sfw=true&filter=bypopularity&page=1");
        setPopularAnime(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchPopularAnime();
          }, 5000);
        } else {
          console.error("Error fetching popular anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchPopularAnime();
  }, []);

  return (
    <section className="popular-anime" id="popular">
      <h1>Populer Anime</h1>
      <div className="popular-anime-container">
        {loading
          ? Array.from({ length: popularAnime.length > 0 ? popularAnime.length : 5 }).map((_, index) => (
              <div className="popular-anime-card" key={index}>
                <Skeleton height={250} width={225} />
              </div>
            ))
          : popularAnime.map((anime, index) => (
              <div className="popular-anime-card" key={`${anime.mal_id}${index}`}>
                <Link
                  to={`/detail/${anime.mal_id}/${anime.title
                    .toLowerCase()
                    .replace(/[^\w\s]/gi, "_")
                    .replace(/\s+/g, "_")}`}
                >
                  <img src={anime.images.webp.large_image_url} alt={anime.title} className="popular-anime-image" loading="lazy" />
                </Link>
                <div className="popular-anime-detail">
                  <Link
                    to={`/detail/${anime.mal_id}/${anime.title
                      .toLowerCase()
                      .replace(/[^\w\s]/gi, "_")
                      .replace(/\s+/g, "_")}`}
                  >
                    <h3 className="popular-anime-name">{anime.title}</h3>
                  </Link>
                  <p className="popular-anime-member">
                    Popularity : {anime.members.toLocaleString()}&nbsp;
                    <i className="uil uil-user"></i>
                  </p>
                  <span className="popular-anime-type">{anime.type}</span>
                </div>
              </div>
            ))}
        <Link to="/popular" title="See More Popular Anime" className="see-more">
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

export default PopularAnime;
