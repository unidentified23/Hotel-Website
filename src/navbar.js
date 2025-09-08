import React, { useState, useEffect } from 'react'
import logo from "./images/h-logo.png"
import { Link } from 'react-router-dom';
import { useAuth } from "./authcontext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";



function Navbar() {
  const [showpopup, setShowpopup]= useState(false);
    const { user, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
   const openPopup = () => setShowpopup(true);
   const closePopup = () => setShowpopup(false);
   console.log("user mail is:",user)

   function toSignin(){
    closePopup();
    navigate("/signin");
    console.log("Navigating to signin...");
    

   }

    useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
    
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("User data:", docSnap.data());
            const userData = docSnap.data();
            setUserData(userData);
          } else {
            console.log("No such document!");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };

    fetchUserData();
  }, [user]); 

 
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
          <p>{user.email}</p>
          <p>Hello {userData.firstname}</p>
          
          <button  className='signBtn' onClick={logout} >Logout</button>
        </>
      ) : (
        <>
          <p>❌ Not logged in</p>
          <button className='signBtn' onClick={toSignin} >
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