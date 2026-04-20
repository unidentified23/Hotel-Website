import Logo from "../images/Hotel logo.png";
import { useState, useEffect } from "react";
import "./forgotpass.css";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function Forgotpass() {
  const [Email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const auth = getAuth();

  //function for timer to prevent multiple clicks
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Function to handle email submission for password reset
  const submitEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    sendPasswordResetEmail(auth, Email)
      .then(() => {
        // Password reset email sent!

        setCountdown(60);
        alert(
          "If an account with that email exists, a password reset link has been sent.",
        );
        console.log("Check your inbox.");
      })
      .catch((error) => {

        alert("Something went wrong please try again");
      })
      .finally(() => {
        // This runs NO MATTER WHAT (success or failure)
        setLoading(false);
      });
  };
  const toLoginPage = () => {
    navigate("/signin");
  };
  return (
    <div className="forgotpass-Content">
      <div className="forgotpass-Container">
        <img src={Logo} alt="logo" className="HotelLogoSignin " />

        <p className="instruction">
          An email with reset link will be sent to your email entered below{" "}
        </p>
        <form className="forgotpass-input-Container" onSubmit={submitEmail}>
          <input
            type="email"
            placeholder="Enter Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <div className="signin-n-sendLink">
            <button
              type="button"
              className="signin-page"
              onClick={toLoginPage}
              disabled={loading} 
            >
              Login page
            </button>
            <button className="sendLink-Btn">
              {loading
                ? "submiting..."
                : countdown > 0
                  ? `Resend in ${countdown}s`
                  : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgotpass;
