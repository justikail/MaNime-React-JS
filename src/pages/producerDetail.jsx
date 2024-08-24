import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { visibility } from "../utils/visibility";
import useProducerDetail from "../hooks/useProducerDetail";
import Breadcrumb from "../components/animeDetail/detailBreadcrumb";
import DetailSkeleton from "../components/producerDetail/detailSkeleton";
import DetailTitle from "../components/producerDetail/detailTitle";
import DetailImage from "../components/producerDetail/detailImage";
import DetailInformation from "../components/producerDetail/detailInformation";
import DetailAbout from "../components/producerDetail/detailAbout";
import DetailAnimeList from "../components/producerDetail/detailAnimeList";
import { FavoriteProvider } from "../context/favoriteContext";

export default function ProducerDetail() {
  const { id, title } = useParams();
  const { data, loading, translatedAbout } = useProducerDetail({ id: id });
  const [isShow, setIsShow] = useState({
    info: true,
    about: true,
    anime: true,
  });
  const [filter, setFilter] = useState("");
  const navigate = useNavigate("");

  if (!loading && (!data || data.length === 0)) {
    return navigate("/404");
  }

  return (
    <>
      <section className="detail-anime">
        <div className="detail-anime-container">
          {loading ? (
            <DetailSkeleton />
          ) : (
            data && (
              <FavoriteProvider loading={loading}>
                <Helmet>
                  <title>MaNime - {data.titles[0].title}</title>
                  <meta property="og:url" content={`https://manime-reactjs.vercel.app/producer/${id}/${title}`} />
                  <meta property="og:title" content={`MaNime - ${data.titles[0].title}`} />
                  <meta
                    property="og:description"
                    content={`${data.about === null ? `Detail dari produser ${data.titles[0].title} mulai dari jumlah penggemar, tanggal berdiri, deskripsi singkat, dan list anime yang diproduseri.` : translatedAbout}`}
                  />
                  <meta property="og:image" content={`${data.images.jpg.image_url}`} />
                  <meta property="og:image:type" content="image/jpeg" />
                  <link rel="canonical" href={`https://manime-reactjs.vercel.app/producer/${id}/${title}`} />
                </Helmet>

                <DetailTitle data={data} />

                <div className="detail-anime-table">
                  <div className="detail-anime-left">
                    <DetailImage data={data} />

                    <div className="detail-anime-detail">
                      <DetailInformation data={data} setIsShow={() => visibility({ key: "info", setIsShow: setIsShow })} isShow={isShow.info} />
                    </div>
                  </div>

                  <div className="detail-anime-right">
                    <Breadcrumb
                      paths={[
                        { title: "Home", link: "/" },
                        {
                          title: "Produser",
                          link: "/producer/",
                        },
                        { title: data.titles[0].title },
                      ]}
                    />

                    <DetailAbout data={data} setIsShow={() => visibility({ key: "about", setIsShow: setIsShow })} isShow={isShow.about} translatedAbout={translatedAbout} />

                    <DetailAnimeList id={id} setIsShow={() => visibility({ key: "anime", setIsShow: setIsShow })} isShow={isShow.anime} filter={filter} setFilter={setFilter} />
                  </div>
                </div>
              </FavoriteProvider>
            )
          )}
        </div>
      </section>
    </>
  );
}
