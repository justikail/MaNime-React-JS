import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function RandomSkeleton() {
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
            <div className="detail-anime-share">
              <Skeleton height={40} width={40} />
              <Skeleton height={40} width={40} />
              <Skeleton height={40} width={40} />
              <Skeleton height={40} width={40} />
            </div>

            <div className="detail-anime-information">
              <h3>
                Informasi <i className="uil uil-angle-up"></i>
              </h3>
              <Skeleton height={150} width="100%" />
            </div>

            <div className="detail-anime-stats">
              <h3>
                Statistik <i className="uil uil-angle-up"></i>
              </h3>
              <Skeleton height={100} width="100%" />
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
              <h2>
                Galeri <i className="uil uil-angle-up"></i>
              </h2>
            </div>
            <Skeleton height={80} width="100%" />
          </div>

          <div className="detail-anime-synopsis">
            <h2>
              Sinopsis <i className="uil uil-angle-up"></i>
            </h2>
            <Skeleton height={80} width="100%" />
          </div>

          <div className="detail-anime-background">
            <h2>
              Background <i className="uil uil-angle-up"></i>
            </h2>
            <Skeleton height={80} width="100%" />
          </div>

          <div className="detail-anime-character">
            <div className="detail-anime-character-head">
              <h2>
                Karakter &amp; VA <i className="uil uil-angle-up"></i>
              </h2>
            </div>
            <Skeleton height={80} width="100%" />
          </div>

          <div className="detail-anime-suggest">
            <h2>
              Rekomendasi <i className="uil uil-angle-up"></i>
            </h2>
            <Skeleton height={80} width="100%" />
          </div>
        </div>
      </div>
    </>
  );
}

export default RandomSkeleton;
