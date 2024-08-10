import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DetailSkeleton() {
  return (
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
            <div className="detail-anime-information">
              <h3>
                Informasi <i className="uil uil-angle-up"></i>
              </h3>
              <Skeleton height={150} width="100%" />
            </div>
          </div>
        </div>

        <div className="detail-anime-right">
          <Skeleton height={20} width="100%" />

          <div className="studio-about">
            <h2>
              Deskripsi <i className="uil uil-angle-up"></i>
            </h2>
            <Skeleton height={80} width="100%" />
          </div>

          <div className="studio-animelist">
            <h2>
              Anime <i className="uil uil-angle-up"></i>
            </h2>
            <Skeleton height={200} width="100%" />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailSkeleton;
