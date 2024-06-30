import React, { useState, useEffect } from "react";
import { setupCache } from "axios-cache-adapter";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../Components/Templates/Header";
import Footer from "../Components/Templates/Footer";
import GenreList from "../Components/Home/GenreList";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

const Genre = () => {
  const { id, title } = useParams();
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [lastPage, setLastPage] = useState("");

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await api.get(`https://api.jikan.moe/v4/anime?sfw=true&genres=${id}&order_by=end_date&sort=desc&page=${page}`);
        setGenre(response.data.data);
        setLastPage(response.data.pagination.has_next_page);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchGenre();
          }, 5000);
        } else {
          console.error("Error fetching genre anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchGenre();
  }, [page, id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowButton(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNextPage = () => {
    setPage((prevPage) => page + 1);
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(page - 1, 1));
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      <Helmet>
        <title>MaNime - Genre {title.replaceAll("_", " ")}</title>
        <meta property="og:url" content={`https://manime-reactjs.vercel.app/genre/${id}/${title}`} />
        <meta property="og:title" content={`MaNime - Genre ${title.replaceAll("_", " ")}`} />
        <meta property="og:description" content={`Daftar anime dengan genre ${title.replaceAll("_", " ")}. Yang diurutkan dari yang terbaru.`} />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href={`https://manime-reactjs.vercel.app/genre/${id}/${title}`} />
      </Helmet>
      <Header />
      <section className="genre-anime" id="genre">
        <h1>Genre : {title.replaceAll("_", " ")}</h1>
        <div className="genre-anime-container">
          {loading ? (
            Array.from({ length: genre.length > 0 ? genre.length : 25 }).map((_, index) => (
              <div className="genre-anime-card" key={index}>
                <Skeleton height={300} width="100%" />
              </div>
            ))
          ) : id === "12" ? (
            <p>Puasa Bro ...</p>
          ) : (
            genre.map((anime, index) => (
              <div className="genre-anime-card" key={`${anime.mal_id}${index}`}>
                <Link
                  to={`/detail/${anime.mal_id}/${anime.title
                    .toLowerCase()
                    .replace(/[^\w\s]/gi, "_")
                    .replace(/\s+/g, "_")}`}
                >
                  <img src={anime.images.webp.large_image_url} alt={anime.title} className="genre-anime-image" loading="lazy" />
                  <div className="genre-anime-detail">
                    <span>{anime.title}</span>
                    <p>
                      {`${anime.type || "Unknown"}${anime.episodes > 1 ? `(${anime.episodes})` : ""}`} <i className="uil uil-star"></i> {anime.score || "N/A"} <i className="uil uil-user"></i> {anime.members.toLocaleString() || "?"}
                    </p>
                  </div>
                  <span className="genre-anime-status">{mappingStatus(anime.status) || "?"}</span>
                </Link>
              </div>
            ))
          )}
        </div>
        <div className="count-page">
          <button className="prev-page" onClick={handlePrevPage} disabled={page === 1} style={{ backgroundColor: page === 1 ? "#333" : "#101010" }}>
            Prev
          </button>
          <p> {page} </p>
          <button className="next-page" onClick={handleNextPage} disabled={lastPage === false} style={{ backgroundColor: lastPage === false ? "#333" : "#101010" }}>
            Next
          </button>
        </div>
      </section>
      <GenreList />
      {showButton && <button type="button" id="goTop" title="Back To Top" className="back-to-top uil uil-angle-double-up" onClick={scrollToTop}></button>}
      <Footer />
    </>
  );
};

export default Genre;
