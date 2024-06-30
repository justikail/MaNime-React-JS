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

const PopularNow = () => {
  const [popularNow, setPopularNow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularNow = async () => {
      try {
        const response = await api.get(`https://api.jikan.moe/v4/anime?sfw=true&status=airing&min_score=7&order_by=score&sort=desc&page=1`);
        setPopularNow(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchPopularNow();
          }, 5000);
        } else {
          console.error("Error fetching popular now anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchPopularNow();
  }, []);

  return (
    <section className="popular-now" id="popnow">
      <h1>Populer Musim Ini</h1>
      <div className="popular-now-container">
        {loading
          ? Array.from({ length: popularNow.length > 0 ? popularNow.length : 5 }).map((_, index) => (
              <div className="popular-now-card" key={index}>
                <Skeleton height={250} width={225} />
              </div>
            ))
          : popularNow.map((anime, index) => (
              <div className="popular-now-card" key={`${anime.mal_id}${index}`}>
                <Link
                  to={`/detail/${anime.mal_id}/${anime.title
                    .toLowerCase()
                    .replace(/[^\w\s]/gi, "_")
                    .replace(/\s+/g, "_")}`}
                >
                  <img src={anime.images.webp.large_image_url} alt={anime.title} className="popular-now-image" loading="lazy" />
                </Link>
                <div className="popular-now-detail">
                  <Link
                    to={`/detail/${anime.mal_id}/${anime.title
                      .toLowerCase()
                      .replace(/[^\w\s]/gi, "_")
                      .replace(/\s+/g, "_")}`}
                  >
                    <h3 className="popular-now-name">{anime.title}</h3>
                  </Link>
                  <p className="popular-now-rate">Rate : {anime.score} &#11088;</p>
                  <span className="popular-now-type">{anime.type}</span>
                </div>
              </div>
            ))}
        <Link to="/popnow" title="See More Popular Now Anime" className="see-more">
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

export default PopularNow;
