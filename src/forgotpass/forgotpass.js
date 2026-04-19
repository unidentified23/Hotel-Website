import Logo from "../images/Hotel logo.png";
import { useState } from "react";
import "./forgotpass.css";
import { useNavigate } from "react-router-dom";

function Forgotpass() {
  const [Email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    // Function to handle email submission for password reset
    // This is where you would integrate with your backend or Firebase to send the reset email
    alert(
      "If an account with that email exists, a password reset link has been sent.",
    );
  };
  const toLoginPage= () => {
    navigate("/signin")
  }
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
            <button type="button" className="signin-page" onClick={toLoginPage}>Login page</button>
            <button className="sendLink-Btn">Submit</button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Forgotpass;
