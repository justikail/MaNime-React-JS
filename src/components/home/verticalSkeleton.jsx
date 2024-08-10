import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function VerticalSkeleton() {
  return (
    <div className="vertical-view-card">
      <Skeleton height={230} width={155} />
    </div>
  );
}

export default VerticalSkeleton;
