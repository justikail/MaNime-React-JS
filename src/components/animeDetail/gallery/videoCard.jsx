import PropTypes from "prop-types";

function VideoCard({ video, onClick }) {
  return (
    <div className="detail-anime-video-container">
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
        onClick={onClick}
      >
        <span />
        <p className="video-title">{video.title.split(" (")[0]}</p>
      </a>
    </div>
  );
}

VideoCard.propTypes = {
  video: PropTypes.object,
  onClick: PropTypes.func,
};

export default VideoCard;
