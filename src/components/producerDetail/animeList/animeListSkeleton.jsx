import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AnimeListSkeleton() {
  return (
    <div className="studio-animelist-card">
      <Skeleton height={295} width="100%" />
    </div>
  );
}

export default AnimeListSkeleton;
