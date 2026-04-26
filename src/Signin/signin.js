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
    if (loading) return;    // Prevents multiple submissions while loading
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );// Attempt to sign in the user with the provided email and password

      const user = userCredential.user;  // Get the signed-in user from the userCredential object
      alert(`  Login successful
         Welcome, ${user.email}`);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {    // Handle invalid credentials error (e.g., incorrect password)
        alert("Incorrect password.");
        } else if (errorCode === "auth/invalid-email") {  // Handle invalid email format error
          alert("No account found with this email.");
        } else {
        alert("Something went wrong please try again");// Handle other errors (e.g., network issues)
      }
    } finally {
      setLoading(false);
    }
  };
  const SignupPage = () => {
    navigate("/signup");  // Navigates to the Signup page
  };
  const ForgotPass = () => {
    navigate("/forgotpass");    // Navigates to the Forgot Password page
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
            minLength="8"
            maxLength="60"
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
