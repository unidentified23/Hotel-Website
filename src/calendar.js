import React, { useState, useEffect } from "react";
import { collection, addDoc, Timestamp, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseconfig";
import { useAuth } from "./authcontext";


function Calendar({roomDetails}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showpopup, setShowpopup]= useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user} = useAuth();
  

  // Get month and year
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); 
  const roomN = roomDetails;
  const roomId = roomDetails.id; 
  console.log("room is:", roomN);
  console.log("room id is:", roomId);

  // Get first day of the month (0 = Sunday)
  const firstDay = new Date(year, month, 1).getDay();
  // Get total days in this month
  const daysInMonth = new Date(year, month + 1, 0).getDate(); //LAST DAY OF DE month

  // Create array for days
  const daysArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Change month
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const openPopup = () => setShowpopup(true);
   const closePopup = () => setShowpopup(false);
   //gets selected date as a prop 
  const bookFunction = (day) =>{
      const clickedDate = new Date(year, month, day);
      setSelectedDate(clickedDate);
  openPopup()
  }
 //saves slected date to the database
  async function saveUserDate( selectedDate, room) {
      console.log("saveUserDate called");

  try {
    
    const firestoreDate = Timestamp.fromDate(selectedDate);

    // Reference to user's "dates" subcollection
    const bookingsRef = collection(db,"bookings");
     console.log("user is ::",user)
      console.log("room iss ::",room)
      console.log("selectedDate:", selectedDate);
    // Add a new document inside the user's "dates" subcollection
    await addDoc(bookingsRef, {
      email: user.email,
      date: firestoreDate,
      roomId: roomId,
      roomDetails:room,
      createdAt: Timestamp.now()  

    });
    console.log("Document successfully written!");
    alert("bookin confirmed ")
    closePopup()
  } catch (error) {
    console.error(" Error adding date:", error);
  }
}

useEffect(() => {
  if (!roomId) return;

  setIsLoading(true);

  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, where("roomId", "==", roomId));

  // This listener stays active as long as the component is mounted
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    console.log("Documents found for this room:", querySnapshot.size);
    const dates = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        room: data.roomId,
        date: data.date ? data.date.toDate().toDateString() : "Missing Date"
      };
    });

    setBookedDates(dates);
    setIsLoading(false);
  }, (error) => {
    console.error("Listener failed:", error);
    setIsLoading(false);
  });

  // CLEANUP: This stops the listener when the user leaves the page
  return () => unsubscribe();
}, [roomId]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={prevMonth}>←</button>
        <h2>{monthNames[month]} {year}</h2>
        <button onClick={nextMonth}>→</button>
      </div>

      <div style={styles.weekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} style={styles.weekday}>{day}</div>
        ))}
      </div>

      <div style={styles.days}>
    
        {Array(firstDay).fill(null).map((_, i) => (
          <div key={`empty-${i}`} style={styles.day}></div> //creates an empty array with length firstDay:
        ))}
       {daysArray.map(day => {
  const dateObj = new Date(year, month, day);
  const dateString = dateObj.toDateString();

  const bookingEntry = bookedDates.find(
    b => b.date === dateString && b.room === roomId
  );

  const isBooked = !!bookingEntry;

  return (
    <div 
      key={day} 
      style={{
        ...styles.day,
        backgroundColor: isBooked ? '#FF6B6B' : '#51CF66'
      }}
      onClick={() => !isBooked && bookFunction(day)}
    >
      {day}
    </div>
  );
})}
    
    
      {/* Now you even have access to the specific booking ID if you need it! */}
     {/* {isBooked && <small style={{display: 'block'}}>ID: {bookingEntry.id}</small>}*/}

    
      { /* {daysArray.map(day => (
          <div key={day} style={styles.day} onClick={()=> bookFunction (day)}>{day}</div> //loops over each day and renders it:
        ))}*/}

      </div>
        {showpopup&&(
            <div style={styles.BookpopupContainer}>
              <p onClick={closePopup} >X</p>
              <button onClick={() => saveUserDate(selectedDate, roomN)}>Book</button>
            
            </div>
          )}
    </div>
  );
}

const styles = {
  container: {
    width: "320px",
    margin: " auto",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "#f8f9fa"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },
  weekdays: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    fontWeight: "bold"
  },
  weekday: {
    padding: "5px 0"
  },
  days: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px"
  },
  day: {
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 0 2px rgba(0,0,0,0.1)"
  },
  BookpopupContainer:{
    width:"50%",
    height: "30%",
    position: "absolute",
    bottom:"40%",
    right: "25%",
    backgroundColor:"rgb(172,225,175)",


  },
};

export default Calendar;
