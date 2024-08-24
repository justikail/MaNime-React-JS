import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>MaNime - 404 Not Found</title>
        <meta property="og:title" content="MaNime - 404 Not Found" />
        <meta property="og:description" content="404 Page Not Found." />
      </Helmet>
      <div className="notfound-container">
        <h1>
          <Link to="/" style={{ color: "white" }}>
            404
          </Link>
        </h1>
        <div className="chibi-wrapper">
          <div className="chibi">
            <img src="/img/chibi1.svg" alt="Chibi1" />
          </div>
          <div className="chibi">
            <img src="/img/chibi2.svg" alt="Chibi2" />
          </div>
          <div className="chibi">
            <img src="/img/chibi3.svg" alt="Chibi3" />
          </div>
          <div className="chibi">
            <img src="/img/chibi4.svg" alt="Chibi4" />
          </div>
          <div className="chibi">
            <img src="/img/chibi5.svg" alt="Chibi5" />
          </div>
          <div className="chibi">
            <img src="/img/chibi6.svg" alt="Chibi6" />
          </div>
          <div className="chibi">
            <img src="/img/chibi7.svg" alt="Chibi7" />
          </div>
          <div className="chibi">
            <img src="/img/chibi8.svg" alt="Chibi8" />
          </div>
        </div>
      </div>
    </>
  );
}
