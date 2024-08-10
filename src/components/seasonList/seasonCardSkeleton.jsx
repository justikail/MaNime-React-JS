import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SeasonListCard() {
  return (
    <div className="season-list-card">
      <Skeleton height={150} width={150} />
    </div>
  );
}

export default SeasonListCard;
