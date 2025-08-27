import { Routes, Route,useLocation } from "react-router-dom";
import Home from "./Home";
import Navbar from "./navbar";
import Rooms from "./rooms";
import Facilities from "./facilities";
import BottomNavbar from "./bottomNavbar";
import Signin from "./signin";
import Signup from "./signup";
import Forgotpass from "./forgotpass";

function AppRoutes() {
    const location = useLocation();
  return (
    <div>
        {!["/signin", "/signup", "/forgotpass"].includes(location.pathname) && (<><Navbar /> <BottomNavbar/> </> )}
         
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/bottomNavbar" element={<BottomNavbar />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpass" element={<Forgotpass />} />
           
          </Routes>

          
    </div>
  )
}

export default AppRoutes