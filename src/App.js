import "./App.css";
import { Routes, Route,useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./components/navbar/navbar";
import Rooms from "./Rooms/rooms";
import Facilities from "./Facilities/facilities";
import BottomNavbar from "./components/BotomNav/bottomNavbar";
import Signin from "./Signin/signin";
import Signup from "./Signup/signup";
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
