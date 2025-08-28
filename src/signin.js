import Logo from "./images/hotellogo.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth} from "./firebaseconfig";

function Signin() {
  const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
  const navigate = useNavigate();
    const nextPage = async () => {
      try{
         const userCredential= await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    alert("Login successful")
    navigate("/");
      } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/invalid-credential') {
  alert("Incorrect password.");
} else if (errorCode === 'auth/invalid-email') {
  alert("No account found with this email.");
} else {
  alert("Login error: " + errorCode + " - " + errorMessage);
}

      };
     // this should match your <Route path="/nextpage" />
  };
     const SignupPage = () => {
    navigate("/signup"); // this should match your <Route path="/nextpage" />
  };
   const ForgotPass = () => {
    navigate("/forgotpass"); // this should match your <Route path="/nextpage" />
  };

  return (
    <div className='signinbody'>
    
        <div className='inputContainer'>
            <input type='text' placeholder='Email'  value={email}  onChange={(e) => setEmail(e.target.value)} />
            <input type='Password' placeholder='Password'  value={password}  onChange={(e) => setPassword(e.target.value)} />
            <button className='signinBtn' onClick={nextPage}>Sign in</button>
            <p className='FPassLink' onClick={ForgotPass} >Forgot password? </p>
              <p className='newAccLink' onClick={SignupPage} >Don't have an account? </p>
             <img  src={Logo} alt='logo' className="HotelLogoSignin "   />
        </div>

    </div>
  )
}

export default Signin