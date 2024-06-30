import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setupCache } from "axios-cache-adapter";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../Components/Templates/Header";
import Footer from "../Components/Templates/Footer";
import GenreList from "../Components/Home/GenreList";
import BreadCrumb from "../Components/Studio/BreadCrumb";
import AnimeList from "../Components/Studio/AnimeList";

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

const StudioProducers = () => {
  const { id, title } = useParams();
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [translatedAbout, setTranslatedAbout] = useState("");
  const [showInformation, setShowInformation] = useState(true);
  const [showAbout, setShowAbout] = useState(true);
  const [showAnime, setShowAnime] = useState(true);
  const [about, setAbout] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const response = await api.get(`https://api.jikan.moe/v4/producers/${id}/full`);
        setStudio(response.data.data);
        setAbout(response.data.data.about);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchStudio();
          }, 5000);
        } else if (error.response && error.response.status === 404) {
          console.error("Can't found anime, redirecting...");
          setTimeout(() => {
            window.location.href = "/404";
          }, 1);
        } else {
          console.error("Error fetching studio anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchStudio();
  }, [id]);

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
    const translateAbout = async () => {
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
            Text: `${about}`,
          },
        ],
      };

      try {
        const response = await api.request(options);
        setTranslatedAbout(response.data[0].translations[0].text);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            translateAbout();
          }, 5000);
        } else {
          console.error("Error translating description: ", error);
          setLoading(false);
        }
      }
    };

    translateAbout();
  }, [about]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      <section className="studio-anime">
        <div className="studio-container">
          {loading ? (
            <>
              <div className="studio-title">
                <Skeleton height={100} width="100%" />
              </div>

              <div className="studio-table">
                <div className="studio-left">
                  <div className="studio-image">
                    <div className="spinner"></div>
                  </div>

                  <div className="studio-detail">
                    <div className="studio-information">
                      <h3 onClick={() => setShowInformation(!showInformation)}>
                        Informasi <i className={`uil ${showInformation ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h3>
                      <Skeleton height={150} width="100%" />
                    </div>
                  </div>
                </div>

                <div className="studio-right">
                  <Skeleton height={20} width="100%" />

                  <div className="studio-about">
                    <h2 onClick={() => setShowAbout(!showAbout)}>
                      Deskripsi <i className={`uil ${showAbout ? "uil-angle-up" : "uil-angle-down"}`}></i>
                    </h2>
                    <Skeleton height={80} width="100%" />
                  </div>

                  <div className="studio-animelist">
                    <h2 onClick={() => setShowAnime(!showAnime)}>
                      Anime <i className={`uil ${showAnime ? "uil-angle-up" : "uil-angle-down"}`}></i>
                    </h2>
                    <Skeleton height={200} width="100%" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            studio && (
              <>
                <Helmet>
                  <title>MaNime - {studio.titles[0].title}</title>
                  <meta property="og:url" content={`https://manime-reactjs.vercel.app/producer/${id}/${title}`} />
                  <meta property="og:title" content={`MaNime - ${studio.titles[0].title}`} />
                  <meta
                    property="og:description"
                    content={`${studio.about === null ? `Detail dari produser ${studio.titles[0].title} mulai dari jumlah penggemar, tanggal berdiri, deskripsi singkat, dan list anime yang diproduseri.` : translatedAbout}`}
                  />
                  <meta property="og:image" content={`${studio.images.jpg.image_url}`} />
                  <meta property="og:image:type" content="image/jpeg" />
                  <link rel="canonical" href={`https://manime-reactjs.vercel.app/producer/${id}/${title}`} />
                </Helmet>

                <div className="studio-title">
                  <h1>{studio.titles[0].title}</h1>
                  <h3>{studio.titles && studio.titles.length > 2 ? studio.titles[2].title : ""}</h3>
                </div>

                <div className="studio-table">
                  <div className="studio-left">
                    <div className="studio-image">
                      <img src={studio.images.jpg.image_url} alt={studio.titles[0].title} loading="lazy" />
                    </div>

                    <div className="studio-detail">
                      <div className="studio-information">
                        <h3 onClick={() => setShowInformation(!showInformation)}>
                          Informasi <i className={`uil ${showInformation ? "uil-angle-up" : "uil-angle-down"}`}></i>
                        </h3>
                        {showInformation && (
                          <>
                            <p>Synonym : {studio.titles && studio.titles.length > 2 ? <span>{studio.titles[2].title}</span> : <span>?</span>}</p>
                            <p>
                              Berdiri : <span>{studio.established === null ? "?" : studio.established.split("T")[0]}</span>
                            </p>
                            <p>
                              Penggemar : <span>{studio.favorites.toLocaleString() || "?"}</span>
                            </p>
                            <p>
                              Total : <span>{studio.count.toLocaleString() || "?"} Anime</span>
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="studio-right">
                    <BreadCrumb
                      paths={[
                        { title: "Home", link: "/" },
                        {
                          title: "Produser",
                          link: "/producer/",
                        },
                        { title: studio.titles[0].title },
                      ]}
                    />

                    <div className="studio-about">
                      <h2 onClick={() => setShowAbout(!showAbout)}>
                        Deskripsi <i className={`uil ${showAbout ? "uil-angle-up" : "uil-angle-down"}`}></i>
                      </h2>
                      {showAbout && <>{studio.about === null ? <p>&nbsp; &nbsp;Tidak ada deskripsi ...</p> : <p>&nbsp; &nbsp;{translatedAbout}</p>}</>}
                    </div>

                    <div className="studio-animelist">
                      <div className="studio-animelist-head">
                        <h2 onClick={() => setShowAnime(!showAnime)}>
                          Anime <i className={`uil ${showAnime ? "uil-angle-up" : "uil-angle-down"}`}></i>
                        </h2>

                        <div className="studio-animelist-filter">
                          <button data-value="tv" onClick={() => setFilter("TV")}>
                            TV
                          </button>
                          <button data-value="ona" onClick={() => setFilter("ONA")}>
                            ONA
                          </button>
                          <button data-value="ova" onClick={() => setFilter("OVA")}>
                            OVA
                          </button>
                          <button data-value="movie" onClick={() => setFilter("Movie")}>
                            MOVIE
                          </button>
                          <button data-value="other" onClick={() => setFilter("")}>
                            OTHER
                          </button>
                        </div>
                      </div>
                      {showAnime && <AnimeList id={id} filter={filter} />}
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

export default StudioProducers;
