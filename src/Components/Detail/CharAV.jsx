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

const CharAv = (props) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await api.get(`https://api.jikan.moe/v4/anime/${props.id}/characters`);
        setCharacters(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchCharacters();
          }, 5000);
        } else {
          console.error("Error fetching character anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchCharacters();
  }, [props.id]);

  return (
    <div className="detail-anime-char-container">
      {loading ? (
        <Skeleton height={80} width="100%" />
      ) : characters && characters.length >= 1 ? (
        characters.slice(0, 9).map((character, index) => (
          <div className="detail-anime-char" key={index}>
            <img src={character.character.images.webp.image_url} alt={character.character.name} loading="lazy" />
            <div className="detail-anime-char-detail">
              <p>
                Name : <span>{character.character.name || "?"}</span>
              </p>
              {(character.voice_actors[0] && (
                <p>
                  VA : <span>{character.voice_actors[0].person.name}</span>
                </p>
              )) || (
                <p>
                  VA : <span>?</span>
                </p>
              )}
              <p>{character.role || "?"}</p>
            </div>
          </div>
        ))
      ) : (
        <p> &nbsp; &nbsp;Tidak ada karakter ...</p>
      )}
    </div>
  );
};

export default CharAv;
