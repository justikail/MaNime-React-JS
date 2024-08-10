import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import PropTypes from "prop-types";

function DetailShare({ id, title }) {
  return (
    <div className="detail-anime-share">
      <FacebookShareButton url={`https://manime-reactjs.vercel.app/${id}/${title}`}>
        <FacebookIcon size={32}></FacebookIcon>
      </FacebookShareButton>
      <TwitterShareButton url={`https://manime-reactjs.vercel.app/${id}/${title}`}>
        <TwitterIcon size={32}></TwitterIcon>
      </TwitterShareButton>
      <WhatsappShareButton url={`https://manime-reactjs.vercel.app/${id}/${title}`}>
        <WhatsappIcon size={32}></WhatsappIcon>
      </WhatsappShareButton>
      <TelegramShareButton url={`https://manime-reactjs.vercel.app/${id}/${title}`}>
        <TelegramIcon size={32}></TelegramIcon>
      </TelegramShareButton>
    </div>
  );
}

DetailShare.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};

export default DetailShare;
