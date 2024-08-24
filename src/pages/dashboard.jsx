import { Helmet } from "react-helmet-async";
import { useFetchProfile } from "../hooks/useFetchProfile";
import { FavoriteProvider } from "../context/favoriteContext";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../libs/firebase";
import DashboardSkeleton from "../components/auth/dashboardSkeleton";
import DashboardHeader from "../components/auth/dashboardHeader";
import DashboardAnime from "../components/auth/dashboardAnime";
import FavoriteOptions from "../components/auth/favoriteOptions";
import { Tooltip } from "react-tooltip";

export default function Dashboard() {
  const { userData: user, loading } = useFetchProfile();
  const [showOptions, setShowOptions] = useState(false);
  const [type, setType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>MaNime - Dashboard</title>
        <meta property="og:url" content="https://manime-reactjs.vercel.app/dashboard" />
        <meta property="og:title" content="MaNime - Dashboard" />
        <meta property="og:description" content="Dashboard pengguna MaNime." />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href="https://manime-reactjs.vercel.app/dashboard" />
      </Helmet>

      <section id="dashboard" className="dashboard">
        <div className="dashboard-container">
          {loading ? (
            <DashboardSkeleton />
          ) : (
            user && (
              <FavoriteProvider loading={loading}>
                <DashboardHeader user={user} />
                <div className="dashboard-favorites">
                  <div className="favorites-panel">
                    <h1 className="active">Favorite List</h1>
                    <div className="favorites-panel-right">
                      <button type="button" className="favorites-panel-toggle" onClick={handleLogout} id="signout">
                        <i className="uil uil-signout" />
                      </button>
                      <Tooltip anchorSelect="#signout" place="left" opacity={1} style={{ borderRadius: 8 }}>
                        Sign Out
                      </Tooltip>
                      <button type="button" className="favorites-panel-toggle" onClick={() => setShowOptions(!showOptions)}>
                        <i className={`uil uil-${showOptions ? "times" : "bars"}`} />
                      </button>
                    </div>
                  </div>

                  <div className="favorites-navigation" style={{ display: showOptions ? "inline-flex" : "none" }}>
                    <FavoriteOptions title="Search:">
                      <div className="favorites-search">
                        <label htmlFor="search-fav" className="uil uil-search" />
                        <input type="search" placeholder="Telusuri anime" id="search-fav" className="search-fav" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                      </div>
                    </FavoriteOptions>

                    <FavoriteOptions title="Type:">
                      <div className="favorites-type">
                        {["TV", "ONA", "OVA", "Movie", ""].map((t) => (
                          <button key={t} type="button" onClick={() => setType(t)} style={{ backgroundColor: type == t ? "#333" : "#030303" }}>
                            {t.toUpperCase() || "ALL"}
                          </button>
                        ))}
                      </div>
                    </FavoriteOptions>

                    <FavoriteOptions title="Share:">
                      <div className="favorites-share">
                        <button type="button" onClick={() => alert("Share fitur coming soon.")}>
                          <i className="uil uil-share-alt" />
                          Share Options
                        </button>
                      </div>
                    </FavoriteOptions>
                  </div>

                  <div className="favorites-list">
                    {user.animeList && user.animeList.length > 0 ? (
                      user.animeList
                        .filter((anime) => anime.title.toLowerCase().includes(searchValue.toLowerCase()))
                        .filter((anime) => (type ? anime.type === type : true))
                        .map((anime, index) => <DashboardAnime anime={anime} key={`${anime.animeId}${index}`} />)
                    ) : (
                      <p>You don&lsquo;t have any favorite anime yet.</p>
                    )}
                  </div>
                </div>
              </FavoriteProvider>
            )
          )}
        </div>
      </section>
    </>
  );
}
