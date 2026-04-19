import Logo from "../images/Hotel logo.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseconfig";
import "./Signin.css";
import ShowIcon from "../images/show.png";
import HideIcon from "../images/Hide.png";

function Signin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const nextPage = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;
      alert(`  Login successful
         Welcome, ${user.email}`);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/invalid-credential") {
        alert("Incorrect password.");
      } else if (errorCode === "auth/invalid-email") {
        alert("No account found with this email.");
      } else {
        alert("Login error: " + errorCode + " - " + errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  const SignupPage = () => {
    navigate("/signup");
  };
  const ForgotPass = () => {
    navigate("/forgotpass");
  };

  return (
    <div className="signin-Content">
      <img src={Logo} alt="logo" className="HotelLogoSignin " />
      <form className="input-Container" onSubmit={nextPage}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <div className="Password-Container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="password-btn"
            type="button"
          >
            {showPassword ? (
              <img src={HideIcon} alt="Hide" className="hideicon" />
            ) : (
              <img src={ShowIcon} alt="Show" className="Showicon" />
            )}
          </button>
        </div>
        <div className="Fpass-n-Signin">
          <button className="FPass-Link" onClick={ForgotPass}>
            Forgot password?
          </button>
          <button type="submit" className="signinBtn" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>

        <button className="newAcc-Link" onClick={SignupPage}>
          Don't have an account?
        </button>
      </form>
    </div>
  );
}

export default Signin;
