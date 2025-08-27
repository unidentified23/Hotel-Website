import Logo from "./images/hotellogo.png";

function forgotpass() {
  return (
    <div>
           <div className='inputContainer'>
            <input type='text' placeholder='Enter Email' />
            <button className='signinBtn' >Submit</button>
        
            <p className='intruction'  >An email with reset link will be sent to your email entered below </p>
             <img  src={Logo} alt='logo' className="HotelLogoSignin "   />
        </div>
        
    </div>
  )
}

export default forgotpass