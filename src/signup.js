import { useState } from "react";
import { auth, db } from "./firebaseconfig";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import Logo from "./images/hotellogo.png";
import { useNavigate } from "react-router-dom";
import {  doc, setDoc } from "firebase/firestore";

function Signup() {
     const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
 

  

   const navigate = useNavigate();
    const nextPage =async () => {
    try{
 const userCredential= await createUserWithEmailAndPassword(auth, email, password);
 const user = userCredential.user;


    await setDoc(doc(db,"users", user.uid),{
      email:user.email,
      firstname:firstname,
      lastname: lastname,
      phonenumber:phoneNumber,
      gender: gender,
      username:username,
      createdAt: new Date(),
    });
    alert("user registerd succesfully");
    navigate("/");
    
  } catch(error){
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Signup error:"+ errorCode+" "+ errorMessage)
    // ..
  };
     // this should match your <Route path="/nextpage" />
  };
   const SigninPage = () => {
    navigate("/signin"); // this should match your <Route path="/nextpage" />
  };


  return (
    <div>
              <div className='inputContainer'>
                     
            <input type='text' placeholder='Firstname'  value={firstname}  onChange={(e) => setFirstname(e.target.value)} />
            <input type='text' placeholder='Lastname'  value={lastname}  onChange={(e) => setLastname(e.target.value)} />
            <input type='text' placeholder='Username'  value={username}  onChange={(e) => setUsername(e.target.value)} />
            <input type='Password' placeholder='Password'  value={password}  onChange={(e) => setPassword(e.target.value)} />
            <input type='text' placeholder='Email'  value={email}  onChange={(e) => setEmail(e.target.value)} />
            <input type='text' placeholder='gender'  value={gender}  onChange={(e) => setGender(e.target.value)} />
            <input type='tel' placeholder='Phone Number'  value={phoneNumber}  onChange={(e) => setPhoneNumber(e.target.value)} />
            
            <button className='signinBtn' onClick={nextPage} >Register</button>
            <p className='FPassLink' onClick={SigninPage} >Already registered? </p>
            <img  src={Logo} alt='logo' className="HotelLogo"   />
        </div>


    </div>
  )
}

export default Signup