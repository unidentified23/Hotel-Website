import { useState } from "react";
import { auth, db } from "../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Logo from "../images/Hotel logo.png";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import "./Signup.css";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const nextPage = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        firstname: firstname,
        lastname: lastname,
        phonenumber: phoneNumber,
        gender: gender,
        username: username,
        createdAt: new Date(),
      });
      alert("user registerd succesfully");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Signup error:" + errorCode + " " + errorMessage);
    }
  };
  const SigninPage = () => {
    navigate("/signin");
  };

  return (
    <div>
      <form className="inputContainer" onSubmit={nextPage}>
        <input
          type="text"
          placeholder="Firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="text"
          placeholder="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          disabled={loading}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value) } 
          required
          disabled={loading}
        />

        <button type="submit" className="signinBtn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="FPassLink" onClick={SigninPage}>
          Already registered?{" "}
        </p>
        <img src={Logo} alt="logo" className="HotelLogo" />
      </form>
    </div>
  );
}

export default Signup;
