import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setupCache } from "axios-cache-adapter";
import { Helmet } from "react-helmet-async";
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { Link } from "react-router-dom";
import axios from "axios";
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

const Detail = () => {
  const { id, title } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showInformation, setShowInformation] = useState(true);
  const [showSynopsis, setShowSynopsis] = useState(true);
  const [showBackground, setShowBackground] = useState(true);
  const [showCharacters, setShowCharacters] = useState(false);
  const [showStatistics, setShowStatistics] = useState(true);
  const [showSong, setShowSong] = useState(true);
  const [showSuggest, setShowSuggest] = useState(true);
  const [showExternal, setShowExternal] = useState(false);
  const [showStreaming, setShowStreaming] = useState(false);
  const [translatedSynopsis, setTranslatedSynopsis] = useState("");
  const [translatedBackground, setTranslatedBackground] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [showRestricted, setShowRestricted] = useState(false);

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

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await api.get(`https://api.jikan.moe/v4/anime/${id}/full`);
        setDetail(response.data.data);
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
            fetchAnime();
          }, 5000);
        } else if (error.response && error.response.status === 404) {
          console.error("Can't found anime, redirecting...");
          setTimeout(() => {
            window.location.href = "/404";
          }, 1);
        } else {
          console.error("Error fetching detail anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchAnime();
  }, [id]);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
                      <Skeleton height={150} width="100%" />
                    </div>

                    <div className="detail-anime-stats">
                      <h3 onClick={() => setShowStatistics(!showStatistics)}>
                        Statistik <i className={`uil ${showStatistics ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h3>
                      <Skeleton height={100} width="100%" />
                    </div>

                    <div className="detail-anime-external">
                      <h3 onClick={() => setShowExternal(!showExternal)}>
                        External <i className={`uil ${showExternal ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h3>
                      <Skeleton height={50} width="100%" />
                    </div>

                    <div className="detail-anime-streaming">
                      <h3 onClick={() => setShowStreaming(!showStreaming)}>
                        Streaming <i className={`uil ${showStreaming ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h3>
                      <Skeleton height={50} width="100%" />
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

                  <div className="detail-anime-related">
                    <h2>Terkait</h2>
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

                  <div className="detail-anime-song">
                    <h2 onClick={() => setShowSong(!showSong)}>
                      Soundtrack <i className={`uil ${showSong ? "uil-angle-down" : "uil-angle-down"}`}></i>
                    </h2>
                    <Skeleton height={80} width="100%" />
                  </div>

                  <div className="detail-anime-suggest">
                    <h2 onClick={() => setShowSuggest(!showSuggest)}>
                      Rekomendasi <i className={`uil ${showSuggest ? "uil-angle-up" : "uil-angle-down"}`}></i>
                    </h2>
                    <Skeleton height={80} width="100%" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            detail && (
              <>
                <Helmet>
                  <title>MaNime - {detail.title}</title>
                  <meta property="og:url" content={`https://manime-reactjs.vercel.app/detail/${id}/${title}`} />
                  <meta property="og:title" content={`MaNime - ${detail.title}`} />
                  <meta property="og:description" content={`${detail.synopsis === null ? `Detail dari anime ${detail.title} mulai dari jumlah penggemar, tanggal rilis, sinopsis, rating, score, dan lainnya.` : translatedSynopsis}`} />
                  <meta property="og:image" content={`${detail.images.webp.large_image_url}`} />
                  <meta property="og:image:type" content="image/webp" />
                  <link rel="canonical" href={`https://manime-reactjs.vercel.app/detail/${id}/${title}`} />
                </Helmet>
                <div className="detail-anime-title">
                  <h1>{detail.title}</h1>
                  <h3>{detail.title_english || detail.title}</h3>
                </div>

                <div className="detail-anime-table">
                  <div className="detail-anime-left">
                    <div className="detail-anime-image">
                      <img src={detail.images.webp.large_image_url} alt={detail.title} loading="lazy" />
                    </div>

                    <div className="detail-anime-detail">
                      <div className="detail-anime-share">
                        <FacebookShareButton url={`https://manime-reactjs.vercel.app/${id}/${title}`}>
                          <FacebookIcon></FacebookIcon>
                        </FacebookShareButton>
                        <TwitterShareButton url={`https://manime-reactjs.vercel.app/${id}/${title}`}>
                          <TwitterIcon></TwitterIcon>
                        </TwitterShareButton>
                        <WhatsappShareButton url={`https://manime-reactjs.vercel.app/${id}/${title}`}>
                          <WhatsappIcon></WhatsappIcon>
                        </WhatsappShareButton>
                        <TelegramShareButton url={`https://manime-reactjs.vercel.app/${id}/${title}`}>
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
                              Type : <span>{detail.type || "?"}</span>
                            </p>
                            <p>
                              Episode : <span>{detail.episodes || "?"}</span>
                            </p>
                            <p>
                              Status : <span>{mappingStatus(detail.status) || "?"}</span>
                            </p>
                            <p>
                              Rilis : <span>{`${detail.aired.from ? detail.aired.from.split("T")[0] : "?"} - ${detail.aired.to ? detail.aired.to.split("T")[0] : "?"}`}</span>
                            </p>
                            <p>
                              Musim :{" "}
                              {detail.season && detail.year > 0 ? <Link to={`/musim/${detail.season.toLowerCase()}/${detail.year}`}>{`${detail.season} ${detail.year}`}</Link> : <span>{`${detail.season || "?"} ${detail.year || "?"}`}</span>}
                            </p>
                            <p>Penayangan : {detail.broadcast.day && detail.broadcast.day.length > 0 ? <Link to={`/jadwal`}>{mappingDay(detail.broadcast.day)}</Link> : <span>{mappingDay(detail.broadcast.day) || "?"}</span>}</p>
                            <p>
                              Produser :{" "}
                              {detail.producers && detail.producers.length > 0 ? (
                                detail.producers.map((produser, index) => (
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
                              {detail.studios && detail.studios.length > 0 ? (
                                detail.studios.map((studio, index) => (
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
                              Sumber : <span>{detail.source || "?"}</span>
                            </p>
                            <p>
                              Genre :{" "}
                              {detail.genres && detail.genres.length > 0 ? (
                                detail.genres.map((genre, index) => (
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
                              {detail.demographics && detail.demographics.length > 0 ? (
                                detail.demographics.map((demografis, index) => (
                                  <Link
                                    to={`/genre/${demografis.mal_id}/${demografis.name
                                      .toLowerCase()
                                      .replace(/[^\w\s]/gi, "_")
                                      .replace(/\s+/g, "_")}`}
                                    key={demografis.mal_id}
                                  >{`${demografis.name}${index === detail.demographics.length - 1 ? "" : ", "}`}</Link>
                                ))
                              ) : (
                                <span>{"?"}</span>
                              )}
                            </p>
                            <p>
                              Durasi : <span>{`${(detail.duration ? detail.duration.split(" per")[0] : "?") && (detail.duration === "Unknown" ? "?" : detail.duration.split(" per")[0])}/Eps`}</span>
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
                                {detail.score || "N/A"} / {(detail.scored_by && detail.scored_by.toLocaleString()) || "?"} User
                              </span>
                            </p>
                            <p>
                              Rank : <span>#{detail.rank || "?"}</span>
                            </p>
                            <p>
                              Popularitas : <span>#{(detail.popularity && detail.popularity.toLocaleString()) || "?"}</span>
                            </p>
                            <p>
                              Member : <span>{(detail.members && detail.members.toLocaleString()) || "?"}</span>
                            </p>
                            <p>
                              Favorit : <span>{(detail.favorites && detail.favorites.toLocaleString()) || "?"}</span>
                            </p>
                          </>
                        )}
                      </div>

                      {detail.external && detail.external.length > 0 ? (
                        <div className="detail-anime-external">
                          <h3 onClick={() => setShowExternal(!showExternal)}>
                            External <i className={`uil ${showExternal ? "uil-angle-up" : "uil-angle-down"}`}></i>
                          </h3>
                          {showExternal &&
                            detail.external.map((links, index) => (
                              <p className="uil uil-link-h" key={index}>
                                &nbsp;
                                <a href={links.url} target="_black" rel="noreferrer">
                                  {links.name}
                                </a>
                              </p>
                            ))}
                        </div>
                      ) : (
                        ""
                      )}

                      {detail.streaming && detail.streaming.length > 0 ? (
                        <div className="detail-anime-streaming">
                          <h3 onClick={() => setShowStreaming(!showStreaming)}>
                            Streaming <i className={`uil ${showStreaming ? "uil-angle-up" : "uil-angle-down"}`}></i>
                          </h3>
                          {showStreaming &&
                            detail.streaming.map((stream, index) => (
                              <p className="uil uil-link-h" key={index}>
                                &nbsp;
                                <a href={stream.url} target="_blank" rel="noreferrer">
                                  {stream.name}
                                </a>
                              </p>
                            ))}
                        </div>
                      ) : (
                        ""
                      )}
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
                        { title: detail.title },
                      ]}
                    />
                    <div className="detail-anime-info">
                      <div className="detail-anime-score">
                        <h1>{detail.score || "N/A"}</h1>
                        <p>{(detail.scored_by && detail.scored_by.toLocaleString()) || "?"} USERS</p>
                      </div>

                      <div className="detail-anime-more">
                        <p>
                          Ranked #<span>{detail.rank || "?"}</span>
                        </p>
                        <p>
                          Popularity #<span>{(detail.popularity && detail.popularity.toLocaleString()) || "?"}</span>
                        </p>
                        <p>
                          Members #<span>{(detail.members && detail.members.toLocaleString()) || "?"}</span>
                        </p>
                      </div>
                    </div>

                    <div className="detail-anime-trailer">
                      <div className="detail-anime-trailer-head">
                        <h2 onClick={() => setShowTrailer(!showTrailer)}>
                          Galeri <i className={`uil ${showTrailer ? "uil-angle-up" : "uil-angle-down"}`}></i>
                        </h2>
                        <Link to={`/detail/${id}/${title}/gallery`}>MORE</Link>
                      </div>
                      {showTrailer && (loading ? <Skeleton height={80} width="100%" /> : <Gallery id={id} />)}
                    </div>

                    <div className="detail-anime-synopsis">
                      <h2 onClick={() => setShowSynopsis(!showSynopsis)}>
                        Sinopsis <i className={`uil ${showSynopsis ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h2>
                      {showSynopsis && (loading ? <Skeleton height={80} width="100%" /> : <p>&nbsp; &nbsp;{detail.synopsis ? translatedSynopsis.split("[Ditulis oleh MAL Rewrite]")[0] : "Tidak ada sinopsis ..."}</p>)}
                    </div>

                    <div className="detail-anime-background">
                      <h2 onClick={() => setShowBackground(!showBackground)}>
                        Background <i className={`uil ${showBackground ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h2>
                      {showBackground && (loading ? <Skeleton height={80} width="100%" /> : <p>&nbsp; &nbsp;{detail.background ? translatedBackground : "Tidak ada background ..."}</p>)}
                    </div>

                    <div className="detail-anime-related">
                      <h2>Terkait</h2>
                      {detail.relations.length > 1 ? (
                        detail.relations
                          .filter((relation) => relation.relation !== "Adaptation")
                          .map((relation, index) => (
                            <p key={index}>
                              &nbsp;&nbsp;
                              {relation.relation} :{" "}
                              {relation.entry.length > 0 ? (
                                relation.entry.map((entry, entryIndex) => (
                                  <React.Fragment key={entry.mal_id}>
                                    <a
                                      href={`/detail/${entry.mal_id}/${entry.name
                                        .toLowerCase()
                                        .replace(/[^\w\s]/gi, "_")
                                        .replace(/\s+/g, "_")}`}
                                    >
                                      {entry.name}
                                    </a>
                                    {entryIndex !== relation.entry.length - 1 && ", "}
                                  </React.Fragment>
                                ))
                              ) : (
                                <p>&nbsp; &nbsp;Tidak ada related anime ...</p>
                              )}
                            </p>
                          ))
                      ) : (
                        <p>&nbsp; &nbsp;Tidak ada related anime ...</p>
                      )}
                    </div>

                    <div className="detail-anime-character">
                      <div className="detail-anime-character-head">
                        <h2 onClick={() => setShowCharacters(!showCharacters)}>
                          Karakter &amp; VA <i className={`uil ${showCharacters ? "uil-angle-up" : "uil-angle-down"}`}></i>
                        </h2>
                        <Link to={`/detail/${id}/${title}/char`}>MORE</Link>
                      </div>
                      {showCharacters && (loading ? <Skeleton height={80} width="100%" /> : <CharAv id={id} />)}
                    </div>

                    <div className="detail-anime-song">
                      <h2 onClick={() => setShowSong(!showSong)}>
                        Soundtrack <i className={`uil ${showSong ? "uil-angle-down" : "uil-angle-down"}`}></i>
                      </h2>
                      {showSong &&
                        (loading ? (
                          <Skeleton height={80} width="100%" />
                        ) : (
                          <>
                            <div className="detail-anime-song-category">
                              <h3>Opening</h3>
                              <h3>Ending</h3>
                            </div>
                            <div className="detail-anime-song-container">
                              <div className="detail-anime-song-op">
                                {detail.theme.openings && detail.theme.openings.length > 0 ? (
                                  detail.theme.openings.map((opening, index) => (
                                    <div className="opening-name" key={index}>
                                      <a href={`https://www.youtube.com/results?search_query=${opening}`} rel="noreferrer" target="_blank">
                                        {opening}
                                      </a>
                                    </div>
                                  ))
                                ) : (
                                  <p>Tidak ada opening ...</p>
                                )}
                              </div>

                              <div className="detail-anime-song-ed">
                                {detail.theme.endings && detail.theme.endings.length > 0 ? (
                                  detail.theme.endings.map((ending, index) => (
                                    <div className="ending-name" key={index}>
                                      <a href={`https://www.youtube.com/results?search_query=${ending}`} rel="noreferrer" target="_blank">
                                        {ending}
                                      </a>
                                    </div>
                                  ))
                                ) : (
                                  <p>Tidak ada ending ...</p>
                                )}
                              </div>
                            </div>
                          </>
                        ))}
                    </div>

                    <div className="detail-anime-suggest">
                      <h2 onClick={() => setShowSuggest(!showSuggest)}>
                        Rekomendasi <i className={`uil ${showSuggest ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h2>
                      {showSuggest && (loading ? <Skeleton height={80} width="100%" /> : <Suggest id={id} />)}
                    </div>
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

export default Detail;
