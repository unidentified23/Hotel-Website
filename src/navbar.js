import React, { useState } from 'react'
import logo from "./images/h-logo.png"
import { Link } from 'react-router-dom';
import { useAuth } from "./authcontext";
import { useNavigate } from "react-router-dom";



function Navbar() {
  const [showpopup, setShowpopup]= useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
   const openPopup = () => setShowpopup(true);
   const closePopup = () => setShowpopup(false);
   console.log("user mail is:",user)


 
  return (
    <div className='navbar'>
       <div className='navbarContainer' >
        <Link to="/" >Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/facilities" >Facilities</Link>
        <Link></Link>
            <img  src={logo} alt='logo' className='logo'  />
    </div>
    <div className="loginsign" onClick={openPopup}  >m</div>
    {showpopup && (
       <div className='popupContainer' >
        <button onClick={closePopup} className='closepopup' >X</button>
          <div  className='popupFunction'>
      {user ? (
        <>
          <p>✅{user.email}</p>
          
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <p>❌ Not logged in</p>
          <button onClick={() => navigate("./signin") }>
            Login
          </button>
        </>
      )}
    </div>

       </div>

    )}
  

    </div>
  ) 
}

export default Navbar