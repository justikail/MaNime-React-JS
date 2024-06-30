import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { setupCache } from "axios-cache-adapter";
import VideoModal from "./VideoModal";

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

const Gallery = (props) => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get(`https://api.jikan.moe/v4/anime/${props.id}/videos`);
        setGallery(response.data.data.promo);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too Many Requests, waiting before retrying...");
          setTimeout(() => {
            fetchGallery();
          }, 5000);
        } else {
          console.error("Error fetching upcoming anime: ", error);
          setLoading(false);
        }
      }
    };

    fetchGallery();
  }, [props.id]);

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
          <Skeleton height={80} width="100%" />
        ) : gallery && gallery.length > 0 ? (
          gallery.map((video, index) => (
            <div className="detail-anime-video-container" key={index}>
              <a
                href="#showvideo"
                style={{
                  background: `linear-gradient(to top, rgba(1, 1, 3, 1) 0%, rgba(1, 1, 3, 0.8) 5%, rgba(255, 255, 255, 0) 100%), url(https://i.ytimg.com/vi/${video.trailer.youtube_id}/mqdefault.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenModal(video.trailer.embed_url);
                }}
              >
                <span></span>
                <p className="video-title">{video.title.split(" (")[0]}</p>
              </a>
            </div>
          ))
        ) : (
          <p>&nbsp; &nbsp;Tidak ada trailer ...</p>
        )}
        {openModal && <VideoModal open={openModal} onClose={handleCloseModal} embedUrl={selectedVideo} />}
      </div>
    </>
  );
};

export default Gallery;
