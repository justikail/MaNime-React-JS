import Footer from "./components/footer/footer";
import GenreList from "./components/genres/genres";
import Header from "./components/header/header";
import BtnBackTop from "./components/home/btnBackTop";
import PropTypes from "prop-types";
import { useBackTop } from "./hooks/useBackTop";

export default function Layout({ children }) {
  const showButton = useBackTop();

  return (
    <>
      <Header />
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "auto",
        }}
      >
        {children}
      </div>
      <GenreList />
      {showButton && <BtnBackTop />}
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
