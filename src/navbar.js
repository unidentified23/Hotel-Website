import React from 'react'
import logo from "./images/h-logo.png"
import { Link } from 'react-router-dom';




function Navbar() {
 
  return (
    <div className='navbar'>
       <div className='navbarContainer' >
        <Link to="/" >Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/facilities" >Facilities</Link>
        <Link></Link>
            <img  src={logo} alt='logo' className='logo'  />
    </div>
  

    </div>
  ) 
}

export default Navbar