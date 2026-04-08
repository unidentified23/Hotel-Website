import Logo from "../images/Hotel logo.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState} from "react";
import { auth } from "../firebaseconfig";
import "./Signin.css";

function Signin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const nextPage = async (e) => {
    e.preventDefault();
     if (loading) return;
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
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
      <form className="inputContainer" onSubmit={nextPage}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required disabled={loading}
        />
        <button type="submit" className="signinBtn" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <p className="FPassLink" onClick={ForgotPass}>
          Forgot password?
        </p>
        <p className="newAccLink" onClick={SignupPage}>
          Don't have an account?
        </p>
        <img src={Logo} alt="logo" className="HotelLogoSignin " />
      </form>
    </div>
  );
}

export default Signin;
