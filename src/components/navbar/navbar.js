import React, { useState, useEffect } from "react";
import logo from "../../images/hotel-logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../authcontext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import "./Navbar.css";

function Navbar() {
  const [showpopup, setShowpopup] = useState(false);
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const openPopup = () => setShowpopup(true);
  const closePopup = () => setShowpopup(false);

  function toSignin() {
    closePopup();
    navigate("/signin");
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
            console.log("user data is ",userData  );
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

  useEffect(() => {}, [user, userData]);

  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <div className="navbarContainer">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/rooms">Rooms</Link>
        <Link className="link" to="/facilities">Facilities</Link>
      </div>
      <div className="loginsign" onClick={openPopup}>
        m
      </div>
      {showpopup && (
        <div className="popupContainer">
      
          <div className="popupFunction">
             <button onClick={closePopup} className="closepopup">
            X
             </button>
            {user ? (
              <>
                <p>{user.email}</p>
               
                <Link className="Bookings" to="/bookings">Bookings</Link>
                <button className="signBtn" onClick={logout}>
                  Logout
                </button>
                
              </>
              
            ) : (
              <>
                <p>❌ Not logged in</p>
                <button className="signBtn" onClick={toSignin}>
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
