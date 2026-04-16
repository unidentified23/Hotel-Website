import Logo from "../images/hotel-logo.png";
import { useState } from "react";
import "./forgotpass.css";

function Forgotpass() {
  const [Email, setEmail] = useState("");
     const [loading, setLoading] = useState(false);
  const submitEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    // Function to handle email submission for password reset
    // This is where you would integrate with your backend or Firebase to send the reset email
    alert(
      "If an account with that email exists, a password reset link has been sent.",
    );
  };
  return (
    <div className="forgotpass-Content">
      <div className="inputContainer">
        <p className="intruction">
          An email with reset link will be sent to your email entered below{" "}
        </p>
        <img src={Logo} alt="logo" className="HotelLogoSignin " />
        <form className="input-Container" onSubmit={submitEmail}>
           <input
            type="email"
            placeholder="Enter Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <button className="signinBtn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Forgotpass;
