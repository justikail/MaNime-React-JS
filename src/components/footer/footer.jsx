import SpecialThanks from "./specialThanks";
import FooterLinks from "./footerLinks";

function Footer() {
  return (
    <>
      <SpecialThanks />
      <footer>
        <div className="footer-container">
          <div className="footer-start">
            <img src="/img/icon.png" alt="Footer Icon" className="footer-icon" />
            <img src="/img/MaNime-white.png" alt="Footer Icon" className="footer-icon" />
            <img src="/img/MaNime-black.png" alt="Footer Icon" className="footer-icon" />
            <div className="footer-about">
              <h1>
                MaNime<span>.</span>
              </h1>
              <p>&nbsp;MaNime adalah website yang menyediakan informasi mengenai anime populer, ongoing, dan rekomendasi anime. Website MaNime masih dalam tahap pengembangan untuk fitur lainnya.</p>
            </div>
          </div>

          <div className="footer-end">
            <div className="footer-navbar">
              <h1>LINKS</h1>
              <FooterLinks />
            </div>
          </div>
        </div>

        <span className="footer-copyright">
          &copy; 2023 MaNime - Created With ❤️ By <a href="https://github.com/justikail"> Justikail</a>
        </span>
      </footer>
    </>
  );
}

export default Footer;
