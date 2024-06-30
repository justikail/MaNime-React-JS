import React, { useState, useEffect } from "react";
import { setupCache } from "axios-cache-adapter";
import { Helmet } from "react-helmet-async";
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../Components/Templates/Header";
import Footer from "../Components/Templates/Footer";
import BreadCrumb from "../Components/Detail/BreadCrumb";
import Gallery from "../Components/Detail/Gallery";
import CharAv from "../Components/Detail/CharAV";
import Suggest from "../Components/Detail/Suggest";
import GenreList from "../Components/Home/GenreList";
import Restricted from "../Components/Detail/Restricted";

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

const Random = () => {
  const [randomAnime, setRandomAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showInformation, setShowInformation] = useState(true);
  const [showSynopsis, setShowSynopsis] = useState(true);
  const [showBackground, setShowBackground] = useState(true);
  const [showCharacters, setShowCharacters] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showSuggest, setShowSuggest] = useState(true);
  const [translatedSynopsis, setTranslatedSynopsis] = useState("");
  const [translatedBackground, setTranslatedBackground] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [showRestricted, setShowRestricted] = useState(false);

  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const response = await api.get(`https://api.jikan.moe/v4/random/anime`);
        setRandomAnime(response.data.data);
        translateSynopsis(response.data.data.synopsis);
        translateBackground(response.data.data.background);
        if (response.data.data.rating === "Rx - Hentai") {
          setShowRestricted(true);
        }
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchRandom();
          }, 5000);
        } else {
          console.error("Error fetching random anime: ", error);
        }
      }
    };

    fetchRandom();
  }, []);

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

  const mappingDay = (day) => {
    switch (day) {
      case "Sundays":
        return "Minggu";
      case "Mondays":
        return "Senin";
      case "Tuesdays":
        return "Selasa";
      case "Wednesdays":
        return "Rabu";
      case "Thursdays":
        return "Kamis";
      case "Fridays":
        return "Jumat";
      case "Saturdays":
        return "Sabtu";
      case "Unknown":
        return "?";
      default:
        return day;
    }
  };

  const translateSynopsis = async (text) => {
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        "to[0]": "id",
        "api-version": "3.0",
        from: "en",
        profanityAction: "NoAction",
        textType: "plain",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "743aaeefafmshd0bdb29251123e8p1e1b65jsnc2b66366a965",
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
      },
      data: [
        {
          Text: `${text}`,
        },
      ],
    };

    try {
      const response = await api.request(options);
      setTranslatedSynopsis(response.data[0].translations[0].text);
    } catch (error) {
      console.error(`Error translating synopsis:`, error);
    }
  };

  const translateBackground = async (text) => {
    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        "to[0]": "id",
        "api-version": "3.0",
        from: "en",
        profanityAction: "NoAction",
        textType: "plain",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "743aaeefafmshd0bdb29251123e8p1e1b65jsnc2b66366a965",
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
      },
      data: [
        {
          Text: `${text}`,
        },
      ],
    };

    try {
      const response = await api.request(options);
      setTranslatedBackground(response.data[0].translations[0].text);
    } catch (error) {
      console.error("Error translating background: ", error);
    }
  };

  return (
    <>
      <Header />
      {showRestricted && <Restricted />}
      <section className="detail-anime">
        <div className="detail-anime-container">
          {loading ? (
            <>
              <div className="detail-anime-title">
                <Skeleton height={100} width="100%" />
              </div>

              <div className="detail-anime-table">
                <div className="detail-anime-left">
                  <div className="detail-anime-image">
                    <div className="spinner"></div>
                  </div>

                  <div className="detail-anime-detail">
                    <div className="detail-anime-share">
                      <Skeleton height={40} width={40} />
                      <Skeleton height={40} width={40} />
                      <Skeleton height={40} width={40} />
                      <Skeleton height={40} width={40} />
                    </div>

                    <div className="detail-anime-information">
                      <h3 onClick={() => setShowInformation(!showInformation)}>
                        Informasi <i className={`uil ${showInformation ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h3>
                      <Skeleton height={200} width="100%" />
                    </div>

                    <div className="detail-anime-stats">
                      <h3 onClick={() => setShowStatistics(!showStatistics)}>
                        Statistik <i className={`uil ${showStatistics ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h3>
                      <Skeleton height={100} width="100%" />
                    </div>
                  </div>
                </div>

                <div className="detail-anime-right">
                  <Skeleton height={20} width="100%" />
                  <div className="detail-anime-info">
                    <Skeleton height={80} width="100%" />
                  </div>

                  <div className="detail-anime-trailer">
                    <div className="detail-anime-trailer-head">
                      <h2 onClick={() => setShowTrailer(!showTrailer)}>
                        Galeri <i className={`uil ${showTrailer ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h2>
                    </div>
                    <Skeleton height={80} width="100%" />
                  </div>

                  <div className="detail-anime-synopsis">
                    <h2 onClick={() => setShowSynopsis(!showSynopsis)}>
                      Sinopsis <i className={`uil ${showSynopsis ? "uil-angle-up" : "uil-angle-down"}`}></i>
                    </h2>
                    <Skeleton height={80} width="100%" />
                  </div>

                  <div className="detail-anime-background">
                    <h2 onClick={() => setShowBackground(!showBackground)}>
                      Background <i className={`uil ${showBackground ? "uil-angle-up" : "uil-angle-down"}`}></i>
                    </h2>
                    <Skeleton height={80} width="100%" />
                  </div>

                  <div className="detail-anime-character">
                    <div className="detail-anime-character-head">
                      <h2 onClick={() => setShowCharacters(!showCharacters)}>
                        Karakter &amp; VA <i className={`uil ${showCharacters ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h2>
                    </div>
                    <Skeleton height={80} width="100%" />
                  </div>

                  <div className="detail-anime-suggest">
                    <h2 onClick={() => setShowSuggest(!showSuggest)}>
                      Rekomendasi <i className={`uil ${showSuggest ? "uil-angle-up" : "uil-angle-down"}`}></i>
                    </h2>
                    <Skeleton height={80} width="100%" />
                  </div>

                  <Skeleton height={35} width="100%" />
                </div>
              </div>
            </>
          ) : (
            randomAnime && (
              <>
                <Helmet>
                  <title>MaNime - Random Anime</title>
                  <meta property="og:url" content="https://manime-reactjs.vercel.app/random" />
                  <meta property="og:title" content="MaNime - Random Anime" />
                  <meta property="og:description" content="Random anime. Cek anime apa yang kamu dapatkan." />
                  <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
                  <meta property="og:image:type" content="image/png" />
                  <link rel="canonical" href="https://manime-reactjs.vercel.app/random" />
                </Helmet>
                <div className="detail-anime-title">
                  <h1>{randomAnime.title}</h1>
                  <h3>{randomAnime.title_english || randomAnime.title}</h3>
                </div>

                <div className="detail-anime-table">
                  <div className="detail-anime-left">
                    <div className="detail-anime-image">
                      <img src={randomAnime.images.webp.large_image_url} alt={randomAnime.title} loading="lazy" />
                    </div>

                    <div className="detail-anime-detail">
                      <div className="detail-anime-share">
                        <FacebookShareButton
                          url={`https://manime-reactjs.vercel.app/${randomAnime.mal_id}/${randomAnime.title
                            .toLowerCase()
                            .replace(/[^\w\s]/gi, "_")
                            .replace(/\s+/g, "_")}`}
                        >
                          <FacebookIcon></FacebookIcon>
                        </FacebookShareButton>
                        <TwitterShareButton
                          url={`https://manime-reactjs.vercel.app/${randomAnime.mal_id}/${randomAnime.title
                            .toLowerCase()
                            .replace(/[^\w\s]/gi, "_")
                            .replace(/\s+/g, "_")}`}
                        >
                          <TwitterIcon></TwitterIcon>
                        </TwitterShareButton>
                        <WhatsappShareButton
                          url={`https://manime-reactjs.vercel.app/${randomAnime.mal_id}/${randomAnime.title
                            .toLowerCase()
                            .replace(/[^\w\s]/gi, "_")
                            .replace(/\s+/g, "_")}`}
                        >
                          <WhatsappIcon></WhatsappIcon>
                        </WhatsappShareButton>
                        <TelegramShareButton
                          url={`https://manime-reactjs.vercel.app/${randomAnime.mal_id}/${randomAnime.title
                            .toLowerCase()
                            .replace(/[^\w\s]/gi, "_")
                            .replace(/\s+/g, "_")}`}
                        >
                          <TelegramIcon></TelegramIcon>
                        </TelegramShareButton>
                      </div>

                      <div className="detail-anime-information">
                        <h3 onClick={() => setShowInformation(!showInformation)}>
                          Informasi <i className={`uil ${showInformation ? "uil-angle-up" : "uil-angle-down"}`}></i>
                        </h3>
                        {showInformation && (
                          <>
                            <p>
                              Type : <span>{randomAnime.type || "?"}</span>
                            </p>
                            <p>
                              Episode : <span>{randomAnime.episodes || "?"}</span>
                            </p>
                            <p>
                              Status : <span>{mappingStatus(randomAnime.status) || "?"}</span>
                            </p>
                            <p>
                              Rilis : <span>{`${randomAnime.aired.from ? randomAnime.aired.from.split("T")[0] : "?"} - ${randomAnime.aired.to ? randomAnime.aired.to.split("T")[0] : "?"}`}</span>
                            </p>
                            <p>
                              Musim :{" "}
                              {randomAnime.season && randomAnime.year > 0 ? (
                                <Link to={`/musim/${randomAnime.season.toLowerCase()}/${randomAnime.year}`}>{`${randomAnime.season} ${randomAnime.year}`}</Link>
                              ) : (
                                <span>{`${randomAnime.season || "?"} ${randomAnime.year || "?"}`}</span>
                              )}
                            </p>
                            <p>
                              Penayangan :{" "}
                              {randomAnime.broadcast.day && randomAnime.broadcast.day.length > 0 ? <Link to={`/jadwal`}>{mappingDay(randomAnime.broadcast.day)}</Link> : <span>{mappingDay(randomAnime.broadcast.day) || "?"}</span>}
                            </p>
                            <p>
                              Produser :{" "}
                              {randomAnime.producers.length > 0 ? (
                                randomAnime.producers.map((produser, index) => (
                                  <span key={produser.mal_id}>
                                    {index > 0 && ", "}
                                    <Link
                                      to={`/producer/${produser.mal_id}/${produser.name
                                        .toLowerCase()
                                        .replace(/[^\w\s]/gi, "_")
                                        .replace(/\s+/g, "_")}`}
                                    >
                                      {produser.name}
                                    </Link>
                                  </span>
                                ))
                              ) : (
                                <span>{"?"}</span>
                              )}
                            </p>
                            <p>
                              Studio :{" "}
                              {randomAnime.studios.length > 0 ? (
                                randomAnime.studios.map((studio, index) => (
                                  <span key={studio.mal_id}>
                                    {index > 0 && ", "}
                                    <Link
                                      to={`/producer/${studio.mal_id}/${studio.name
                                        .toLowerCase()
                                        .replace(/[^\w\s]/gi, "_")
                                        .replace(/\s+/g, "_")}`}
                                    >
                                      {studio.name}
                                    </Link>
                                  </span>
                                ))
                              ) : (
                                <span>{"?"}</span>
                              )}
                            </p>
                            <p>
                              Sumber : <span>{randomAnime.source || "?"}</span>
                            </p>
                            <p>
                              Genre :{" "}
                              {randomAnime.genres.length > 0 ? (
                                randomAnime.genres.map((genre, index) => (
                                  <span key={genre.mal_id}>
                                    {index > 0 && ", "}
                                    <Link
                                      to={`/genre/${genre.mal_id}/${genre.name
                                        .toLowerCase()
                                        .replace(/[^\w\s]/gi, "_")
                                        .replace(/\s+/g, "_")}`}
                                    >
                                      {genre.name}
                                    </Link>
                                  </span>
                                ))
                              ) : (
                                <span>{"?"}</span>
                              )}
                            </p>
                            <p>
                              Demografis :{" "}
                              {randomAnime.demographics.length > 0 ? (
                                randomAnime.demographics.map((demografis, index) => (
                                  <Link
                                    to={`/genre/${demografis.mal_id}/${demografis.name
                                      .toLowerCase()
                                      .replace(/[^\w\s]/gi, "_")
                                      .replace(/\s+/g, "_")}`}
                                    key={demografis.mal_id}
                                  >{`${demografis.name}${index === randomAnime.demographics.length - 1 ? "" : ", "}`}</Link>
                                ))
                              ) : (
                                <span>{"?"}</span>
                              )}
                            </p>
                            <p>
                              Durasi : <span>{`${(randomAnime.duration ? randomAnime.duration.split(" per")[0] : "?") && (randomAnime.duration === "Unknown" ? "?" : randomAnime.duration.split(" per")[0])}/Eps`}</span>
                            </p>
                          </>
                        )}
                      </div>

                      <div className="detail-anime-stats">
                        <h3 onClick={() => setShowStatistics(!showStatistics)}>
                          Statistik <i className={`uil ${showStatistics ? "uil-angle-up" : "uil-angle-down"}`}></i>
                        </h3>
                        {showStatistics && (
                          <>
                            <p>
                              Score :{" "}
                              <span>
                                {randomAnime.score || "N/A"} / {(randomAnime.scored_by && randomAnime.scored_by.toLocaleString()) || "?"} User
                              </span>
                            </p>
                            <p>
                              Rank : <span>#{randomAnime.rank || "?"}</span>
                            </p>
                            <p>
                              Popularitas : <span>#{(randomAnime.popularity && randomAnime.popularity.toLocaleString()) || "?"}</span>
                            </p>
                            <p>
                              Member : <span>{(randomAnime.members && randomAnime.members.toLocaleString()) || "?"}</span>
                            </p>
                            <p>
                              Favorit : <span>{(randomAnime.favorites && randomAnime.favorites.toLocaleString()) || "?"}</span>
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="detail-anime-right">
                    <BreadCrumb
                      paths={[
                        { title: "Home", link: "/" },
                        {
                          title: "Detail",
                          link: "/detail/",
                        },
                        { title: randomAnime.title },
                      ]}
                    />
                    <div className="detail-anime-info">
                      <div className="detail-anime-score">
                        <h1>{randomAnime.score || "N/A"}</h1>
                        <p>{(randomAnime.scored_by && randomAnime.scored_by.toLocaleString()) || "?"} USERS</p>
                      </div>

                      <div className="detail-anime-more">
                        <p>
                          Ranked #<span>{randomAnime.rank || "?"}</span>
                        </p>
                        <p>
                          Popularity #<span>{(randomAnime.popularity && randomAnime.popularity.toLocaleString()) || "?"}</span>
                        </p>
                        <p>
                          Members #<span>{(randomAnime.members && randomAnime.members.toLocaleString()) || "?"}</span>
                        </p>
                      </div>
                    </div>

                    <div className="detail-anime-trailer">
                      <div className="detail-anime-trailer-head">
                        <h2 onClick={() => setShowTrailer(!showTrailer)}>
                          Galeri <i className={`uil ${showTrailer ? "uil-angle-up" : "uil-angle-down"}`}></i>
                        </h2>
                        <Link
                          to={`/detail/${randomAnime.mal_id}/${randomAnime.title
                            .toLowerCase()
                            .replace(/[^\w\s]/gi, "_")
                            .replace(/\s+/g, "_")}/gallery`}
                        >
                          MORE
                        </Link>
                      </div>
                      {showTrailer && (loading ? <Skeleton height={80} width="100%" /> : <Gallery id={randomAnime.mal_id} />)}
                    </div>

                    <div className="detail-anime-synopsis">
                      <h2 onClick={() => setShowSynopsis(!showSynopsis)}>
                        Sinopsis <i className={`uil ${showSynopsis ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h2>
                      {showSynopsis && (loading ? <Skeleton height={80} width="100%" /> : <p>&nbsp; &nbsp;{randomAnime.synopsis ? translatedSynopsis : "Tidak ada sinopsis ..."}</p>)}
                    </div>

                    <div className="detail-anime-background">
                      <h2 onClick={() => setShowBackground(!showBackground)}>
                        Background <i className={`uil ${showBackground ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h2>
                      {showBackground && (loading ? <Skeleton height={80} width="100%" /> : <p>&nbsp; &nbsp;{randomAnime.background ? translatedBackground : "Tidak ada background ..."}</p>)}
                    </div>

                    <div className="detail-anime-character">
                      <div className="detail-anime-character-head">
                        <h2 onClick={() => setShowCharacters(!showCharacters)}>
                          Karakter &amp; VA <i className={`uil ${showCharacters ? "uil-angle-up" : "uil-angle-down"}`}></i>
                        </h2>
                        <Link
                          to={`/detail/${randomAnime.mal_id}/${randomAnime.title
                            .toLowerCase()
                            .replace(/[^\w\s]/gi, "_")
                            .replace(/\s+/g, "_")}/char`}
                        >
                          MORE
                        </Link>
                      </div>
                      {showCharacters && (loading ? <Skeleton height={80} width="100%" /> : <CharAv id={randomAnime.mal_id} />)}
                    </div>

                    <div className="detail-anime-suggest">
                      <h2 onClick={() => setShowSuggest(!showSuggest)}>
                        Rekomendasi <i className={`uil ${showSuggest ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h2>
                      {showSuggest && (loading ? <Skeleton height={80} width="100%" /> : <Suggest id={randomAnime.mal_id} />)}
                    </div>

                    <Link
                      className="load-more"
                      to={`/detail/${randomAnime.mal_id}/${randomAnime.title
                        .toLowerCase()
                        .replace(/[^\w\s]/gi, "_")
                        .replace(/\s+/g, "_")}`}
                    >
                      MORE DETAIL
                    </Link>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </section>
      <GenreList />
      {showButton && <button type="button" id="goTop" title="Back To Top" className="back-to-top uil uil-angle-double-up" onClick={scrollToTop}></button>}
      <Footer />
    </>
  );
};

export default Random;
