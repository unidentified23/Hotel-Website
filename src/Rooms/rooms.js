import { useContext, useState } from "react";
import room1 from "../images/Dbed.jpg";
import room2 from "../images/luxbed.jpg";
import room3 from "../images/Dbed.jpg";
import room4 from "../images/luxbed.jpg";
import wifi from "../images/wifi.png";
import roomServ from "../images/room service.png";
import tv from "../images/TV.png";
import dbed from "../images/single bed.png";
import sbed from "../images/doble bed.png";
import Calendar from "../components/Calendar/calendar";
import { AuthContext } from "../authcontext";
import { Link } from "react-router-dom";
import "./Room.css";

function Rooms() {
  const [showpopup, setShowpopup] = useState(false);
  const { isLoggedin } = useContext(AuthContext);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const openPopup = (room) => {
    setSelectedRoom(room);

    setShowpopup(true);
  };

  const closePopup = () => setShowpopup(false);

  const rooms = [
    { id: 1, name: "luxury suite", picture: room1, price: "R1700pn" },
    { id: 2, name: "luxury suite", picture: room2, price: "R1500pn" },
    { id: 3, name: "luxury suite", picture: room3, price: "R1000pn" },
    { id: 4, name: "luxury suite", picture: room4, price: "R500pn"},
  ];

  const otherrooms = [
    {
      id: 12,
      name: "luxury suite",
      picture: room1,
      price: "R1500pn",
      NoOfBeds: "2s",
    },
    {
      id: 22,
      name: "luxury suite",
      picture: room2,
      price: "R1600pn",
      NoOfBeds: "2s",
    },
    {
      id: 33,
      name: "luxury suite",
      picture: room3,
      price: "R1800pn",
      NoOfBeds: "3s",
    },
    {
      id: 43,
      name: "luxury suite",
      picture: room4,
      price: "R1900pn",
      NoOfBeds: "3s",
    },
  ];

  return (
    <div className="Rooms-Content">
      <h1 className="roomH1">Rooms & Suites</h1>

      <div className="gridContainer">
        {rooms.map((room, id) => (
          <div
            key={room.id}
            className="roomContainer"
            onClick={() => openPopup(room)}
          >
            
            <img src={room.picture} alt={room.name} className="roomPic" />

            <div className="Rnam-Rprice">
              <p >{room.price}</p>
              <p >{room.name}</p>
            </div>
             <div className="iconContainer">
              <img src={wifi} alt="wifi" className="icon" />
              <img src={roomServ} alt="wifi" className="icon" />
              <img src={tv} alt="wifi" className="icon" />
              <img src={dbed} alt="wifi" className="icon" />
            </div>
          </div>
        ))}
        
        {otherrooms.map((room) => (
          <div
            key={room.id}
            className="roomContainer"
            onClick={() => openPopup(room)}
          >
            <img src={room.picture} alt={room.name} className="roomPic" />
            
            <div className="Rnam-Rprice">
              <p>{room.price}</p>
              <p>{room.name}</p>
            </div>
            <div className="iconContainer">
              <img src={wifi} alt="wifi" className="icon" />
              <img src={tv} alt="wifi" className="icon" />
              <img src={sbed} alt="wifi" className="icon" />
              <p className="icon"  >{room.NoOfBeds} </p>

            </div>
          </div>
        ))}
  
       </div>
        {showpopup && (<>
          <div className="popup-overlay" onClick={closePopup}>
   
          </div>
        <div className="roompopupContainer">
                 <button className="calendarClose"  onClick={closePopup}>X</button>
          {isLoggedin ? (
            <Calendar roomDetails={selectedRoom} />
          ) : (
                <div className="loginPromptContainer" >
                  <p>Please log in to book this room.</p>
                  <Link className="loginPrompt" to="/signin">log in</Link>
                </div>
          )}
        </div>
        </>
      )}
    </div>
  );
}

export default Rooms;
