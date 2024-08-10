import Pagination from "../components/animePaging/pagination";
import AnimeListSkeleton from "../components/animePaging/animeCardSkeleton";
import AnimeList from "../components/animePaging/animeCard";
import { Helmet } from "react-helmet-async";
import { useListSchedule } from "../hooks/useAnimePaging";
import { useState } from "react";

export default function ListBySchedule() {
  const [day, setDay] = useState("sunday");
  const { data, loading, page, lastPage, handleNextPage, handlePrevPage } = useListSchedule({ day: day });

  return (
    <>
      <Helmet>
        <title>MaNime - Jadwal Anime</title>
        <meta property="og:url" content="https://manime-reactjs.vercel.app/jadwal" />
        <meta property="og:title" content="MaNime - Jadwal Anime" />
        <meta property="og:description" content="Daftar tayang anime berdasarkan hari." />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href="https://manime-reactjs.vercel.app/jadwal" />
      </Helmet>
      <section className="anime-list" id="schedule">
        <h1>
          Jadwal :
          <select name="day" id="day" onChange={(e) => setDay(e.target.value)}>
            <option value="sunday">Minggu</option>
            <option value="monday">Senin</option>
            <option value="tuesday">Selasa</option>
            <option value="wednesday">Rabu</option>
            <option value="thursday">Kamis</option>
            <option value="friday">Jumat</option>
            <option value="saturday">Sabtu</option>
          </select>
        </h1>
        <div className="anime-list-container">
          {loading ? Array.from({ length: data.length > 0 ? data.length : 25 }).map((_, index) => <AnimeListSkeleton key={index} />) : data.map((anime, index) => <AnimeList anime={anime} key={`${anime.mal_id}${index}`} />)}
        </div>
        <Pagination page={page} lastPage={lastPage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} loading={loading} />
      </section>
    </>
  );
}
