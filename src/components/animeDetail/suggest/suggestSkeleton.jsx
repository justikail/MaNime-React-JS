import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SuggestSkeleton() {
  return (
    <div className="detail-anime-suggest-card">
      <Skeleton height={250} width={225} />
    </div>
  );
}

export default SuggestSkeleton;
