import PropTypes from "prop-types";
import { formatTimestamp } from "../../utils/formatTimestamp";

function DashboardHeader({ user }) {
  return (
    <div className="dashboard-header">
      <div className="profile-image">
        <img src={user.avatar} alt="Avatar" loading="lazy" />
      </div>

      <div className="profile-desc">
        <div className="profile-name">
          <h1>{user.name}</h1>
        </div>
        <div className="profile-email">
          <p>{user.email}</p>
        </div>
        <div className="profile-created">
          <p>{formatTimestamp({ timestamp: user.createdAt }).split(" ")[0]}.</p>
          <p>{user.animeList.length} Anime.</p>
        </div>
        <div className="profile-uid">
          <p>{user.uid}</p>
        </div>
      </div>
    </div>
  );
}

DashboardHeader.propTypes = {
  user: PropTypes.object,
};

export default DashboardHeader;
