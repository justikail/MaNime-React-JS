import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAnimeDetail } from "../hooks/useFetchDetail";
import visibility from "../utils/visibility";
import Breadcrumb from "../components/animeDetail/detailBreadcrumb";
import DetailSkeleton from "../components/animeDetail/detailSkeleton";
import DetailTitle from "../components/animeDetail/detailTitle";
import DetailImage from "../components/animeDetail/detailImage";
import DetailShare from "../components/animeDetail/detailShare";
import DetailInformation from "../components/animeDetail/detailInformation";
import DetailStats from "../components/animeDetail/detailStats";
import DetailExternal from "../components/animeDetail/detailExternal";
import DetailStream from "../components/animeDetail/detailStream";
import DetailScore from "../components/animeDetail/detailScore";
import DetailRatings from "../components/animeDetail/detailRatings";
import DetailSynopsis from "../components/animeDetail/detailSynopsis";
import DetailBackground from "../components/animeDetail/detailBackground";
import DetailRelated from "../components/animeDetail/detailRelated";
import DetailChar from "../components/animeDetail/detailChar";
import DetailSongs from "../components/animeDetail/detailSongs";
import DetailSuggest from "../components/animeDetail/detailSuggest";
import DetailRestricted from "../components/animeDetail/detailRestricted";
import DetailGallery from "../components/animeDetail/detailGallery";
import NotFound from "./notFound";

export default function AnimeDetail() {
  const { id, title } = useParams();
  const { data, loading, isRestricted, translatedSynopsis, translatedBackground } = useAnimeDetail({ id: id });
  const [isShow, setIsShow] = useState({
    trailer: false,
    synopsis: true,
    background: true,
    char: false,
    stats: true,
    song: true,
    suggest: true,
    external: false,
    stream: false,
    info: true,
  });

  if (!loading && (!data || data.length === 0)) {
    return <NotFound />;
  }

  return (
    <>
      {isRestricted && <DetailRestricted />}
      <section className="detail-anime">
        <div className="detail-anime-container">
          {loading ? (
            <DetailSkeleton />
          ) : (
            data && (
              <>
                <Helmet>
                  <title>MaNime - {data.title}</title>
                  <meta property="og:url" content={`https://manime-reactjs.vercel.app/detail/${id}/${title}`} />
                  <meta property="og:title" content={`MaNime - ${data.title}`} />
                  <meta property="og:description" content={`${data.synopsis === null ? `Detail dari anime ${data.title} mulai dari jumlah penggemar, tanggal rilis, sinopsis, rating, score, dan lainnya.` : translatedSynopsis}`} />
                  <meta property="og:image" content={`${data.images.webp.large_image_url}`} />
                  <meta property="og:image:type" content="image/webp" />
                  <link rel="canonical" href={`https://manime-reactjs.vercel.app/detail/${id}/${title}`} />
                </Helmet>
                <DetailTitle data={data} />

                <div className="detail-anime-table">
                  <div className="detail-anime-left">
                    <DetailImage data={data} />

                    <div className="detail-anime-detail">
                      <DetailShare id={id} title={title} />

                      <DetailInformation data={data} setIsShow={() => visibility({ key: "info", setIsShow: setIsShow })} isShow={isShow.info} />

                      <DetailStats data={data} setIsShow={() => visibility({ key: "stats", setIsShow: setIsShow })} isShow={isShow.stats} />

                      <DetailExternal data={data} setIsShow={() => visibility({ key: "external", setIsShow: setIsShow })} isShow={isShow.external} />

                      <DetailStream data={data} setIsShow={() => visibility({ key: "stream", setIsShow: setIsShow })} isShow={isShow.stream} />
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

                    <DetailGallery id={id} title={title} setIsShow={() => visibility({ key: "trailer", setIsShow: setIsShow })} isShow={isShow.trailer} />

                    <DetailSynopsis data={data} setIsShow={() => visibility({ key: "synopsis", setIsShow: setIsShow })} isShow={isShow.synopsis} translatedSynopsis={translatedSynopsis} />

                    <DetailBackground data={data} setIsShow={() => visibility({ key: "background", setIsShow: setIsShow })} isShow={isShow.background} translatedBackground={translatedBackground} />

                    <DetailRelated data={data} />

                    <DetailChar id={id} title={title} setIsShow={() => visibility({ key: "char", setIsShow: setIsShow })} isShow={isShow.char} />

                    <DetailSongs data={data} setIsShow={() => visibility({ key: "song", setIsShow: setIsShow })} isShow={isShow.song} />

                    <DetailSuggest id={id} setIsShow={() => visibility({ key: "suggest", setIsShow: setIsShow })} isShow={isShow.suggest} />
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
