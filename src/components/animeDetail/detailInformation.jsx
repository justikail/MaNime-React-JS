import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formattedGenre, formattedStudio } from "../../utils/formatter";
import { mappingDay, mappingStatus } from "../../utils/mapping";

function DetailInformation({ data, setIsShow, isShow }) {
  return (
    <div className="detail-anime-information">
      <h3 onClick={setIsShow}>
        Informasi <i className={`uil ${isShow ? "uil-angle-up" : "uil-angle-down"}`}></i>
      </h3>
      {isShow && (
        <>
          <p>
            Type : <span>{data.type || "?"}</span>
          </p>
          <p>
            Episode : <span>{data.episodes || "?"}</span>
          </p>
          <p>
            Status : <span>{mappingStatus({ status: data.status }) || "?"}</span>
          </p>
          <p>
            Rilis : <span>{`${data.aired.from ? data.aired.from.split("T")[0] : "?"} - ${data.aired.to ? data.aired.to.split("T")[0] : "?"}`}</span>
          </p>
          <p>Musim : {data.season && data.year > 0 ? <Link to={`/musim/${data.season.toLowerCase()}/${data.year}`}>{`${data.season} ${data.year}`}</Link> : <span>{`${data.season || "?"} ${data.year || "?"}`}</span>}</p>
          <p>Penayangan : {data.broadcast.day && data.broadcast.day.length > 0 ? <Link to="/jadwal">{mappingDay({ day: data.broadcast.day })}</Link> : <span>{mappingDay({ day: data.broadcast.day }) || "?"}</span>}</p>
          <p>
            Produser :{" "}
            {data.producers && data.producers.length > 0 ? (
              data.producers.map((produser, index) => (
                <span key={produser.mal_id}>
                  {index > 0 && ", "}
                  <Link to={formattedStudio({ malId: produser.mal_id, title: produser.name })}>{produser.name}</Link>
                </span>
              ))
            ) : (
              <span>{"?"}</span>
            )}
          </p>
          <p>
            Studio :{" "}
            {data.studios && data.studios.length > 0 ? (
              data.studios.map((studio, index) => (
                <span key={studio.mal_id}>
                  {index > 0 && ", "}
                  <Link to={formattedStudio({ malId: studio.mal_id, title: studio.name })}>{studio.name}</Link>
                </span>
              ))
            ) : (
              <span>{"?"}</span>
            )}
          </p>
          <p>
            Sumber : <span>{data.source || "?"}</span>
          </p>
          <p>
            Genre :{" "}
            {data.genres && data.genres.length > 0 ? (
              data.genres.map((genre, index) => (
                <span key={genre.mal_id}>
                  {index > 0 && ", "}
                  <Link to={formattedGenre({ malId: genre.mal_id, genreName: genre.name })}>{genre.name}</Link>
                </span>
              ))
            ) : (
              <span>{"?"}</span>
            )}
          </p>
          <p>
            Demografis :{" "}
            {data.demographics && data.demographics.length > 0 ? (
              data.demographics.map((demografis, index) => (
                <Link to={formattedGenre({ malId: demografis.mal_id, genreName: demografis.name })} key={demografis.mal_id}>{`${demografis.name}${index === data.demographics.length - 1 ? "" : ", "}`}</Link>
              ))
            ) : (
              <span>{"?"}</span>
            )}
          </p>
          <p>
            Durasi : <span>{`${(data.duration ? data.duration.split(" per")[0] : "?") && (data.duration === "Unknown" ? "?" : data.duration.split(" per")[0])}/Eps`}</span>
          </p>
        </>
      )}
    </div>
  );
}

DetailInformation.propTypes = {
  data: PropTypes.object,
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
};

export default DetailInformation;
