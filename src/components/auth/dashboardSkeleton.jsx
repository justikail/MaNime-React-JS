import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DashboardSkeleton() {
  return (
    <>
      <div className="dashboard-header">
        <div className="profile-image">
          <div className="spinner"></div>
        </div>

        <div className="profile-desc">
          <div className="profile-name">
            <Skeleton height={20} width="100%" />
          </div>
          <div className="profile-email">
            <Skeleton height={20} width="100%" />
          </div>
          <div className="profile-created">
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="100%" />
          </div>
        </div>
      </div>

      <div className="dashboard-favorites">
        <Skeleton height={40} width="100%" />

        <br />
        <Skeleton height={40} width="100%" />
      </div>
    </>
  );
}

export default DashboardSkeleton;
