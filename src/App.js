import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./navbar";
import Rooms from "./rooms";
import Facilities from "./facilities";
import BottomNavbar from "./bottomNavbar";

function App() {
  return (
    <div className="App">
        
      <BrowserRouter>
      
          <Navbar />
         
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/bottomNavbar" element={<BottomNavbar />} />
           
          </Routes>

          <BottomNavbar/>
        
      </BrowserRouter>
      
    </div>
  );
}

export default App;
