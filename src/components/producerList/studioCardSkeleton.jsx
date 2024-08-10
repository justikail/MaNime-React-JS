import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function StudioCardSkeleton() {
  return (
    <div className="produser-list-card">
      <Skeleton height={200} width="100%" />
    </div>
  );
}

export default StudioCardSkeleton;
