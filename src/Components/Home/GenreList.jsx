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

const GenreList = () => {
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGenreList, setShowGenreList] = useState(true);

  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const response = await api.get("https://api.jikan.moe/v4/genres/anime");
        setGenreList(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchGenreList();
          }, 5000);
        } else {
          console.error("Error fetching genre list: ", error);
          setLoading(false);
        }
      }
    };

    fetchGenreList();
  }, []);

  return (
    <section className="genre-list" id="genrelist">
      <h1
        onClick={() => {
          setShowGenreList(!showGenreList);
        }}
      >
        Genre List <i className={`uil ${showGenreList ? "uil-angle-up" : "uil-angle-down"}`}></i>
      </h1>
      {showGenreList && (
        <ul className="genre-list-container">
          {loading ? (
            <Skeleton height={200} width={9999} />
          ) : (
            genreList.map((anime, index) => (
              <li key={`${anime.mal_id}${index}`} className="genre-name">
                <Link
                  to={`/genre/${anime.mal_id}/${anime.name
                    .toLowerCase()
                    .replace(/[^\w\s]/gi, "_")
                    .replace(/\s+/g, "_")}`}
                >
                  {anime.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
};

export default GenreList;
