import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../libs/firebase";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { saveToDatabase } from "../utils/saveToDatabase";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/client");
    } catch (error) {
      let errorMessages;
      switch (error.code) {
        case "auth/invalid-credential":
          errorMessages = "Email atau password salah.";
          break;
        case "auth/invalid-email":
          errorMessages = "Masukan email yang benar.";
          break;
        case "auth/missing-password":
          errorMessages = "Masukan password yang benar.";
          break;
        default:
          errorMessages = "Terjadi kesalahan.";
      }
      setError(errorMessages);
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      await saveToDatabase(user);
      navigate("/client");
    } catch (error) {
      setError("Google login failed. Please try again.");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <>
      <Helmet>
        <title>MaNime - Signin</title>
        <meta property="og:url" content="https://manime-reactjs.vercel.app/signin" />
        <meta property="og:title" content="MaNime - Signin" />
        <meta property="og:description" content="Signin untuk masuk ke halaman MaNime Client." />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href="https://manime-reactjs.vercel.app/signin" />
      </Helmet>

      <div className="form-auth">
        <h2>MaNime Signin</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type={showPassword ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
            <i className={`uil ${showPassword ? "uil-eye" : "uil-eye-slash"}`} onClick={() => setShowPassword(!showPassword)} />
          </div>
          {error && <p style={{ color: "red" }}>&nbsp;{error}</p>}
          <div className="form-button">
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Signin"}
            </button>
            <button type="button" onClick={() => navigate("/signup")}>
              Signup
            </button>
          </div>
          <div className="social-login">
            <span>Login With</span>
            <div className="social-button">
              <button className="login-google" type="button" onClick={handleGoogleLogin}>
                <i className="uil uil-google" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
