import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../Components/Templates/Header";
import Footer from "../Components/Templates/Footer";
import TopAnime from "../Components/Home/TopAnime";
import PopularAnime from "../Components/Home/PopularAnime";
import Column from "../Components/Home/Column";
import PopularNow from "../Components/Home/PopularNow";
import TopUpcoming from "../Components/Home/TopUpcoming";
import GenreList from "../Components/Home/GenreList";

const Home = () => {
  const [showButton, setShowButton] = useState(false);

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
        <title>MaNime - Home</title>
        <meta property="og:url" content="https://manime-reactjs.vercel.app/" />
        <meta property="og:title" content="MaNime - Home" />
        <meta property="og:description" content="MaNime adalah website penyedia informasi seputar anime, seperti anime terbaru, anime terpopuler, rekomendasi anime, dan lainnya." />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href="https://manime-reactjs.vercel.app/" />
      </Helmet>
      <Header />
      <TopAnime />
      <PopularAnime />
      <Column />
      <PopularNow />
      <TopUpcoming />
      <GenreList />
      {showButton && <button type="button" id="goTop" title="Back To Top" className="back-to-top uil uil-angle-double-up" onClick={scrollToTop}></button>}
      <Footer />
    </>
  );
};

export default Home;
