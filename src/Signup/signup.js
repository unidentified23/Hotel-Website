import { useState } from "react";
import { auth } from "../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, limit,  doc, setDoc } from "firebase/firestore";
import Logo from "../images/Hotel logo.png";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import ShowIcon from "../images/show.png";
import HideIcon from "../images/Hide.png";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [EmergencyContact, setEmergencyContact] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showpopup, setShowpopup] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);

  const navigate = useNavigate();
  const SigninPage = () => {
    navigate("/signin");   // Navigates to the Signin page 
  }
const nextPage = async (e) => {
  e.preventDefault(); // Prevents the default form submission behavior
  if (loading) return;  // Prevents multiple submissions while loading
  setLoading(true);

  try {
    //Checks Firestore first to see if the email already exists
    const db = getFirestore();           // Get a reference to Firestore database instance   
    const usersRef = collection(db, "users");         // Creates a reference to the "users" collection in Firestore
    const q = query(usersRef, where("email", "==", email), limit(1)); //looks for a matching email in the "users" collection and limits the result to 1 document
    const querySnapshot = await getDocs(q);         // Execute the query and wait for the results

    if (!querySnapshot.empty) {   // Checks if any matching documents were found
      alert("This email is already registered in our database."); //this massege appears if the email is already registered in the database
      setLoading(false);
      return; // Stop the function here
    }

    // Create the Auth User
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Get the created user from the userCredential object

    // Saves the extra data to Firestore
    await setDoc(doc(db, "users", user.uid), { // Creates a new document in the "users" collection with the user's UID as the document ID
      email: user.email,
      firstname: firstname,
      lastname: lastname,
      phonenumber: phoneNumber,
      gender: gender,
      EmergencyContact: EmergencyContact,
      createdAt: new Date(),
    });

    alert("User registered successfully!"); // Alert the user that registration was successful
    navigate("/"); // Navigates to the home page after successful registration

  } catch (error) {
    console.error(error);
    //  Handle specific Firebase Auth errors
    if (error.code === 'auth/email-already-in-use') {
      alert("This email is already in use by another account.");
    } else {
      alert("Failed to register please try again ");
    }
  } finally {
    setLoading(false); // Ensure loading stops regardless of success or failure
  }
};

 //checks if the password and confirm password match and shows a popup message accordingly
  const validatePassword = (e) => {
    const value = e.target.value; // Get the value from the confirm password input field
    setConfirmPassword(value); // Update the confirmPassword state with the new value
    if (password !== value) {     // Check if the password and confirm password do not match
      setShowpopup(true);         // Show the popup message indicating that the passwords do not match
      setPasswordConfirmed(false);      // Set passwordConfirmed to false to indicate that the passwords do not match
    
    } else {
      setPasswordConfirmed(true);   // Set passwordConfirmed to true to indicate that the passwords match
      setShowpopup(false);          // Hide the popup message since the passwords match
    }
  };

  return (
    <div className="signup-Content">
      <img src={Logo} alt="logo" className="Hotel-Logo" />
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
          type="tel"
          placeholder="Emergency Contact"
          value={EmergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
          required
          disabled={loading}
        />
        <div className="password-Container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required  // The password field is required for form submission
            disabled={loading} // Disable the input field while loading to prevent changes
            minLength="8" // Set a minimum length requirement for the password
            maxLength="60"  // Set a maximum length requirement for the password
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="pass-btn"
          >
            {showPassword ? (
              <img src={HideIcon} alt="Hide" className="hideicon" />
            ) : (
              <img src={ShowIcon} alt="Show" className="Showicon" />
            )}
          </button>
        </div>
        <div className="password-n-popup-container">
       <div className="password-Container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={validatePassword}
            required
            disabled={loading}
            minLength="8"
            maxLength="60"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="pass-btn"
          >
            {showPassword ? (
              <img src={HideIcon} alt="Hide" className="hideicon" />
            ) : (
              <img src={ShowIcon} alt="Show" className="Showicon" />
            )}
          </button>
        </div>
        {showpopup && (
          <div className="password-popup">
          {passwordConfirmed ? (
            <p>Passwords match.</p>
          ) : (
            <p>Passwords do not match.</p>
          )}
          </div>
        
        )}
        </div>

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
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          disabled={loading}
        />
        <div className="Regbtn-n-reglink">
          <button className="Signin-link" onClick={SigninPage}>
            Already registered?{" "}
          </button>
          <button type="submit" className="Reg-Btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}  
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
