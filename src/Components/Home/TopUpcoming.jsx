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

const TopUpcoming = () => {
  const [topUpcoming, setTopUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUpcoming = async () => {
      try {
        const response = await api.get("https://api.jikan.moe/v4/anime?sfw=true&page=1&status=upcoming&order_by=members&sort=desc");
        setTopUpcoming(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchTopUpcoming();
          }, 5000);
        } else {
          console.error("Error fetching upcoming anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchTopUpcoming();
  }, []);

  return (
    <section className="upcoming-anime" id="upcoming">
      <h1>Dinantikan</h1>
      <div className="upcoming-anime-container">
        {loading
          ? Array.from({ length: topUpcoming.length > 0 ? topUpcoming.length : 5 }).map((_, index) => (
              <div className="upcoming-anime-card" key={index}>
                <Skeleton height={250} width={225} />
              </div>
            ))
          : topUpcoming.map((anime, index) => (
              <div className="upcoming-anime-card" key={`${anime.mal_id}${index}`}>
                <Link
                  to={`/detail/${anime.mal_id}/${anime.title
                    .toLowerCase()
                    .replace(/[^\w\s]/gi, "_")
                    .replace(/\s+/g, "_")}`}
                >
                  <img src={anime.images.webp.large_image_url} alt={anime.title} className="upcoming-anime-image" loading="lazy" />
                </Link>
                <div className="upcoming-anime-detail">
                  <Link
                    to={`/detail/${anime.mal_id}/${anime.title
                      .toLowerCase()
                      .replace(/[^\w\s]/gi, "_")
                      .replace(/\s+/g, "_")}`}
                  >
                    <h3 className="upcoming-anime-name">{anime.title}</h3>
                  </Link>
                  <p className="upcoming-anime-member">
                    Popularity : {anime.members.toLocaleString()}&nbsp;
                    <i className="uil uil-user"></i>
                  </p>
                  <span className="upcoming-anime-type">{anime.type ? anime.type : "Unknown"}</span>
                </div>
              </div>
            ))}
        <Link to="/upcoming" title="See More Upcoming Anime" className="see-more">
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

export default TopUpcoming;
