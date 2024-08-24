import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../libs/firebase";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { saveToDatabase } from "../utils/saveToDatabase";

export default function Signup() {
  const [formData, setFormData] = useState({
    displayName: "Gaijin",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(user, { displayName: formData.displayName });
      await saveToDatabase(user);
      navigate("/signin");
    } catch (error) {
      let errorMessages;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessages = "Masukan email yang benar.";
          break;
        case "auth/weak-password":
          errorMessages = "Password harus bernilai 6 karakter.";
          break;
        case "auth/email-already-in-use":
          errorMessages = "Email telah digunakan.";
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>MaNime - Signup</title>
        <meta property="og:url" content="https://manime-reactjs.vercel.app/signup" />
        <meta property="og:title" content="MaNime - Signup" />
        <meta property="og:description" content="Signup untuk masuk ke halaman MaNime Client." />
        <meta property="og:image" content="https://manime-reactjs.vercel.app/img/MaNime-white.png" />
        <meta property="og:image:type" content="image/png" />
        <link rel="canonical" href="https://manime-reactjs.vercel.app/signup" />
      </Helmet>

      <div className="form-auth">
        <h2>MaNime Signup</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="displayName">Name:</label>
            <input type="text" id="displayName" name="displayName" value={formData.displayName} onChange={handleChange} placeholder="Optional" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Password" />
            <i className={`uil ${showPassword ? "uil-eye" : "uil-eye-slash"}`} onClick={() => setShowPassword(!showPassword)} />
          </div>
          {error && <p style={{ color: "red" }}>&nbsp;{error}</p>}
          <div className="form-button">
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Signup"}
            </button>
            <button type="button" onClick={() => navigate("/signin")}>
              Signin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
