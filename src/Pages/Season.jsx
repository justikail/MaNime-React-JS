import React, { useState, useEffect } from "react";
import { setupCache } from "axios-cache-adapter";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../Components/Templates/Header";
import Footer from "../Components/Templates/Footer";
import GenreList from "../Components/Home/GenreList";
import { Link, useParams } from "react-router-dom";
import { mappingStatus } from "../Utils/MappingStatus";

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

const Season = () => {
  const { season, year } = useParams();
  const [seasonList, setSeasonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const fetchSeason = async () => {
      try {
        const response = await api.get(`https://api.jikan.moe/v4/seasons/${year}/${season}?sfw=true&page=${page}`);
        setSeasonList(response.data.data);
        setLastPage(response.data.pagination.has_next_page);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchSeason();
          }, 5000);
        } else {
          console.error("Error fetching season anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchSeason();
  }, [page, season, year]);

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

  return (
    <>
      <Helmet>
        <title>
          MaNime - Anime {season} {year}
        </title>
        <meta property="og:url" content="https://manime-reactjs.vercel.app/musim" />
        <meta property="og:title" content={`MaNime - Anime ${season} ${year}`} />
        <meta property="og:description" content={`Daftar anime yang yang tayang pada musim ${season} tahun ${year}. Diurutkan berdasarkan tanggal rilis.`} />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href={`https://manime-reactjs.vercel.app/musim/${season}/${year}`} />
      </Helmet>
      <Header />
      <section className="anime-season" id="season">
        <h1>
          Anime {season} {year}
        </h1>
        <div className="anime-season-container">
          {loading
            ? Array.from({ length: seasonList.length > 0 ? seasonList.length : 25 }).map((_, index) => (
                <div className="anime-season-card" key={index}>
                  <Skeleton height={300} width="100%" />
                </div>
              ))
            : seasonList.map((anime, index) => (
                <div className="anime-season-card" key={`${anime.mal_id}${index}`}>
                  <Link
                    to={`/detail/${anime.mal_id}/${anime.title
                      .toLowerCase()
                      .replace(/[^\w\s]/gi, "_")
                      .replace(/\s+/g, "_")}`}
                  >
                    <img src={anime.images.webp.large_image_url} alt={anime.title} className="anime-season-image" loading="lazy" />
                    <div className="anime-season-detail">
                      <span>{anime.title}</span>
                      <p>
                        {`${anime.type || "Unknown"}${anime.episodes > 1 ? `(${anime.episodes})` : ""}`} <i className="uil uil-star"></i> {anime.score || "N/A"} <i className="uil uil-user"></i> {anime.members.toLocaleString() || "?"}
                      </p>
                    </div>
                    <span className="anime-season-status">{mappingStatus(anime.status) || "?"}</span>
                  </Link>
                </div>
              ))}
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

export default Season;
