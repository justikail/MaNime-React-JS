import React, { useState, useEffect } from "react";
import { setupCache } from "axios-cache-adapter";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../Components/Templates/Header";
import Footer from "../Components/Templates/Footer";
import GenreList from "../Components/Home/GenreList";
import { Link } from "react-router-dom";

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

const SeasonList = () => {
  const [season, setSeason] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const fetchSeason = async () => {
      try {
        const response = await api.get(`https://api.jikan.moe/v4/seasons`);
        setSeason(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchSeason();
          }, 5000);
        } else {
          console.error("Error fetching season list: ", error);
          setLoading(false);
        }
      }
    };

    fetchSeason();
  });

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Helmet>
        <title>MaNime - Season List</title>
        <meta property="og:url" content="https://manime-reactjs.vercel.app/musim" />
        <meta property="og:title" content="MaNime - Season List" />
        <meta property="og:description" content="Daftar musim dan tahun perilisan anime." />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href="https://manime-reactjs.vercel.app/musim" />
      </Helmet>
      <Header />
      <section className="season-list" id="seasonlist">
        <h1>Season List</h1>
        <div className="season-list-container">
          {loading
            ? Array.from({ length: season.length > 0 ? season.length : 25 }).map((_, index) => (
                <div className="season-list-card" key={index}>
                  <Skeleton height={150} width={200} />
                </div>
              ))
            : season.map((season, index) => (
                <div className="season-list-card" key={index}>
                  <div className="season-list-year">
                    <span>{season.year.toString()[0]}</span>
                    <span>{season.year.toString()[1]}</span>
                    <span>{season.year.toString()[2]}</span>
                    <span>{season.year.toString()[3]}</span>
                  </div>

                  <div className="season-list-season">
                    {season.seasons.map((musim, index) => (
                      <Link to={`/musim/${musim}/${season.year}`} key={`${season.year}${index}`}>
                        {musim}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      </section>
      <GenreList />
      {showButton && <button type="button" id="goTop" title="Back To Top" className="back-to-top uil uil-angle-double-up" onClick={scrollToTop}></button>}
      <Footer />
    </>
  );
};

export default SeasonList;
