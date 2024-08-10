import PropTypes from "prop-types";
import VideoModal from "./videoModal";
import VideoCard from "./videoCard";
import { useEffect, useState } from "react";
import { Fetch } from "../../../libs/fetch";

function Video({ id }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchVideos = async () => {
      try {
        const result = await Fetch({ endPoint: `/anime/${id}/videos` });
        setVideos(result.data.promo);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchVideos();
          }, 5000);
        } else {
          console.error("Error fetching videos anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchVideos();
  }, [id]);

  const handleOpenModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVideo(null);
  };

  return (
    <>
      <div className="detail-anime-video">
        {loading ? (
          "Loading..."
        ) : videos && videos.length > 0 ? (
          videos.map((video, index) => (
            <VideoCard
              video={video}
              key={index}
              onClick={(e) => {
                e.preventDefault();
                handleOpenModal(video.trailer.embed_url);
              }}
            />
          ))
        ) : (
          <p>&nbsp; &nbsp;Tidak ada trailer ...</p>
        )}
        {openModal && <VideoModal open={openModal} onClose={handleCloseModal} embedUrl={selectedVideo} />}
      </div>
    </>
  );
}

Video.propTypes = {
  id: PropTypes.string,
};

export default Video;
