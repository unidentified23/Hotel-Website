import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./authcontext";
function App() {
  
  return (
    <div className="App">
      
        
      <BrowserRouter>
      <AuthProvider>
      <AppRoutes/>
      </AuthProvider>
       
      </BrowserRouter>
      
    </div>
  );
}

export default App;
