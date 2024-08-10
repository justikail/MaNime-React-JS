import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AnimeListSkeleton() {
  return (
    <div className="anime-list-card">
      <Skeleton height={300} width="100%" />
    </div>
  );
}
export default AnimeListSkeleton;
