import Logo from "./images/hotellogo.png";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
    const nextPage = () => {
    navigate("/"); // this should match your <Route path="/nextpage" />
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
            <input type='text' placeholder='Username' />
            <input type='Password' placeholder='Password' />
            <button className='signinBtn' onClick={nextPage}>Sign in</button>
            <p className='FPassLink' onClick={ForgotPass} >Forgot password? </p>
              <p className='newAccLink' onClick={SignupPage} >Don't have an account? </p>
             <img  src={Logo} alt='logo' className="HotelLogoSignin "   />
        </div>

    </div>
  )
}

export default Signin