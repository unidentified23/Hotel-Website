import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseconfig";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("Auth State Changed:", currentUser);
    });

    return () => unsubscribe();
  }, []);


  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, logout }}> 
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    console.log("adf", AuthContext)
  return useContext(AuthContext);
}
