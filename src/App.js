import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { AuthProvider } from "./authcontext";
function App() {
  
  return (
    <div className="App">
      
        
      <BrowserRouter>
      <AuthProvider>
      <Routes/>
      </AuthProvider>
       
      </BrowserRouter>
      
    </div>
  );
}

export default App;
