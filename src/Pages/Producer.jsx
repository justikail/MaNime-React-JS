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

const Producer = () => {
  const [studioList, setStudioList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const response = await api.get(`https://api.jikan.moe/v4/producers?order_by=favorites&sort=desc&page=${page}`);
        setStudioList(response.data.data);
        setLastPage(response.data.pagination.has_next_page);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchStudio();
          }, 5000);
        } else {
          console.error("Error fetching studio list: ", error);
          setLoading(false);
        }
      }
    };

    fetchStudio();
  }, [page]);

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
        <title>MaNime - Produser List</title>
        <meta property="og:url" content="https://manime-reactjs.vercel.app/producer" />
        <meta property="og:title" content="MaNime - Produser List" />
        <meta property="og:description" content="Daftar produser yang diurutkan berdasarkan jumlah penggemar." />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href="https://manime-reactjs.vercel.app/producer" />
      </Helmet>
      <Header />
      <section className="produser-list" id="produser">
        <h1>Produser List</h1>
        <div className="produser-list-container">
          {loading
            ? Array.from({ length: studioList.length > 0 ? studioList.length : 25 }).map((_, index) => (
                <div className="produser-list-card" key={index}>
                  <Skeleton height={200} width="100%" />
                </div>
              ))
            : studioList.map((produser, index) => (
                <div className="produser-list-card" key={`${produser.mal_id}${index}`}>
                  <Link
                    to={`/producer/${produser.mal_id}/${produser.titles[0].title
                      .toLowerCase()
                      .replace(/[^\w\s]/gi, "_")
                      .replace(/\s+/g, "_")}`}
                  >
                    <img src={produser.images.jpg.image_url} alt={produser.titles[0].title} className="produser-list-image" loading="lazy" />
                    <div className="produser-list-detail">
                      <span>{produser.titles[0].title}</span>
                      <p>{`${produser.established === null ? "?" : produser.established.split("T")[0]} (${produser.count.toLocaleString() || "?"})`}</p>
                    </div>
                    <span className="produser-list-fan">
                      <i className="uil uil-user"></i> {produser.favorites.toLocaleString() || "?"}
                    </span>
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

export default Producer;
