import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAnimeRandom } from "../hooks/useFetchDetail";
import { formattedTitle } from "../utils/formatter";
import { Link } from "react-router-dom";
import visibility from "../utils/visibility";
import RandomSkeleton from "../components/animeDetail/random/randomSkeleton";
import Breadcrumb from "../components/animeDetail/detailBreadcrumb";
import DetailTitle from "../components/animeDetail/detailTitle";
import DetailImage from "../components/animeDetail/detailImage";
import DetailShare from "../components/animeDetail/detailShare";
import DetailInformation from "../components/animeDetail/detailInformation";
import DetailStats from "../components/animeDetail/detailStats";
import DetailScore from "../components/animeDetail/detailScore";
import DetailRatings from "../components/animeDetail/detailRatings";
import DetailSynopsis from "../components/animeDetail/detailSynopsis";
import DetailBackground from "../components/animeDetail/detailBackground";
import DetailChar from "../components/animeDetail/detailChar";
import DetailSuggest from "../components/animeDetail/detailSuggest";
import DetailRestricted from "../components/animeDetail/detailRestricted";
import DetailGallery from "../components/animeDetail/detailGallery";

export default function RandomAnime() {
  const { data, loading, isRestricted, translatedSynopsis, translatedBackground } = useAnimeRandom();
  const [isShow, setIsShow] = useState({
    trailer: false,
    synopsis: true,
    background: true,
    char: false,
    stats: true,
    suggest: true,
    info: true,
  });

  return (
    <>
      {isRestricted && <DetailRestricted />}
      <section className="detail-anime">
        <div className="detail-anime-container">
          {loading ? (
            <RandomSkeleton />
          ) : (
            data && (
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
                <DetailTitle data={data} />

                <div className="detail-anime-table">
                  <div className="detail-anime-left">
                    <DetailImage data={data} />

                    <div className="detail-anime-detail">
                      <DetailShare id={data.mal_id} title={data.title} />

                      <DetailInformation data={data} setIsShow={() => visibility({ key: "info", setIsShow: setIsShow })} isShow={isShow.info} />

                      <DetailStats data={data} setIsShow={() => visibility({ key: "stats", setIsShow: setIsShow })} isShow={isShow.stats} />
                    </div>
                  </div>

                  <div className="detail-anime-right">
                    <Breadcrumb
                      paths={[
                        { title: "Home", link: "/" },
                        {
                          title: "Detail",
                          link: "/detail/",
                        },
                        { title: data.title },
                      ]}
                    />
                    <div className="detail-anime-info">
                      <DetailScore data={data} />

                      <DetailRatings data={data} />
                    </div>

                    <DetailGallery id={data.mal_id} title={data.title} setIsShow={() => visibility({ key: "trailer", setIsShow: setIsShow })} isShow={isShow.trailer} />

                    <DetailSynopsis data={data} setIsShow={() => visibility({ key: "synopsis", setIsShow: setIsShow })} isShow={isShow.synopsis} translatedSynopsis={translatedSynopsis} />

                    <DetailBackground data={data} setIsShow={() => visibility({ key: "background", setIsShow: setIsShow })} isShow={isShow.background} translatedBackground={translatedBackground} />

                    <DetailChar id={data.mal_id} title={data.title} setIsShow={() => visibility({ key: "char", setIsShow: setIsShow })} isShow={isShow.char} />

                    <DetailSuggest id={data.id} setIsShow={() => visibility({ key: "suggest", setIsShow: setIsShow })} isShow={isShow.suggest} />

                    <Link className="load-more" to={formattedTitle({ malId: data.mal_id, title: data.title })}>
                      MORE DETAIL
                    </Link>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </section>
    </>
  );
}
