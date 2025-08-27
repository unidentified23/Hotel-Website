import Logo from "./images/hotellogo.png";
import { useNavigate } from "react-router-dom";

function Signup() {
   const navigate = useNavigate();
    const nextPage = () => {
    navigate("/"); // this should match your <Route path="/nextpage" />
  };
   const SigninPage = () => {
    navigate("/signin"); // this should match your <Route path="/nextpage" />
  };


  return (
    <div>
                <div className='inputContainer'>
                     
            <input type='text' placeholder='Firstname' />
            <input type='text' placeholder='Lastname' />
            <input type='text' placeholder='Username' />
            <input type='Password' placeholder='Password' />
            <input type='text' placeholder='Email' />
            <input type='text' placeholder='gender' />
            <input type='tel' placeholder='Phone Number' />
            
            <button className='signinBtn' onClick={nextPage} >Register</button>
            <p className='FPassLink' onClick={SigninPage} >Already registered? </p>
            <img  src={Logo} alt='logo' className="HotelLogo"   />
        </div>


    </div>
  )
}

export default Signup