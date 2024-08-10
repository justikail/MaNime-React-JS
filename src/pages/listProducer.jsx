import Pagination from "../components/animePaging/pagination";
import StudioCardSkeleton from "../components/producerList/studioCardSkeleton";
import StudioCard from "../components/producerList/studioCard";
import { useListProducer } from "../hooks/useAnimePaging";
import { Helmet } from "react-helmet-async";

export default function ListProducer() {
  const { data, loading, page, lastPage, handleNextPage, handlePrevPage } = useListProducer();

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
      <section className="anime-list" id="produser">
        <h1>Produser List</h1>
        <div className="produser-list-container">
          {loading ? Array.from({ length: data.length > 0 ? data.length : 25 }).map((_, index) => <StudioCardSkeleton key={index} />) : data.map((produser, index) => <StudioCard produser={produser} key={`${produser.mal_id}${index}`} />)}
        </div>
        <Pagination page={page} lastPage={lastPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} loading={loading} />
      </section>
    </>
  );
}
