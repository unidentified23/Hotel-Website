import "./App.css";
import { Routes, Route,useLocation } from "react-router-dom";
import Home from "./Home";
import Navbar from "./navbar";
import Rooms from "./rooms";
import Facilities from "./facilities";
import BottomNavbar from "./bottomNavbar";
import Signin from "./signin";
import Signup from "./signup";
import Forgotpass from "./forgotpass";
import Admin from "./admin";

function App() {
      const location = useLocation();
      const hideNavbar = ["/signin", "/signup", "/forgotpass", "/admin"].includes(location.pathname);
  return (
    <div className="App" >

        {!hideNavbar && <Navbar /> }

      <main className="Main-content">
          
      
              <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/rooms" element={<Rooms />} />
                      <Route path="/facilities" element={<Facilities />} />
                      <Route path="/signin" element={<Signin />} />
                      <Route path="/bottomNavbar" element={<BottomNavbar />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/forgotpass" element={<Forgotpass />} />
                      <Route path="/admin" element={<Admin />} />
                     
              </Routes>
      </main>

      <footer>
        {!hideNavbar && <BottomNavbar /> }
      </footer>
    
      
    </div>
  );
}

export default App;
