import Modal from "react-responsive-modal";

const VideoModal = ({ open, onClose, embedUrl }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      closeOnOverlayClick={true}
      closeOnEsc={true}
      styles={{
        modal: {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          background: "#030303",
          borderRadius: "8px",
          marginTop: "20px",
        },
      }}
    >
      <iframe
        style={{
          boxShadow: "0 0 50px rgba(1, 1, 3, 0.8)",
        }}
        title="video"
        width="100%"
        height="100%"
        src={embedUrl}
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </Modal>
  );
};

export default VideoModal;
