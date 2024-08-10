import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HorizontalSkeleton() {
  return (
    <div className="horizontal-view-card">
      <Skeleton height={250} width={225} />
    </div>
  );
}

export default HorizontalSkeleton;
