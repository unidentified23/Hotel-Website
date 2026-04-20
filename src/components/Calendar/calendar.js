import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useAuth } from "../../authcontext";
import "./Calendar.css";


function Calendar({ roomDetails }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showpopup, setShowpopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Get month and year
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const roomN = roomDetails;
  const roomId = roomDetails.id;

  // Get first day of the month (0 = Sunday)
  const firstDay = new Date(year, month, 1).getDay();
  // Get total days in this month
  const daysInMonth = new Date(year, month + 1, 0).getDate(); 

  // Create array for days in a month
  const daysArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Change month
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1)); //previous month
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1)); //next month
  };

  const openPopup = () => setShowpopup(true);  //opens the booking popup
  const closePopup = () => setShowpopup(false); //closes the booking popup

  //gets selected date as a prop
  const bookFunction = (day) => {
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    openPopup();
  };

  //saves selected date to the database receives selected date and room details as props
  async function saveUserDate(selectedDate, room) {
    try {
      const firestoreDate = Timestamp.fromDate(selectedDate); // Convert a normal JavaScript Date (selectedDate) into a Firestore Timestamp objec

      const bookingsRef = collection(db, "bookings"); //this creates a reference to the "bookings" collection in firestore
     
      // Adds a new document inside the user's "bookings" collection
      await addDoc(bookingsRef, {
        email: user.email,              //store user email as email field in the booking document
        date: firestoreDate,           //store the Firestore timestamp as the date field in the booking document
        roomId: roomId,               //store the room ID as roomId field in the booking document
        roomDetails: room,           //store the entire room details object as roomDetails field in the booking document
        createdAt: Timestamp.now(), //store the current timestamp as createdAt field in the booking document to keep track of when the booking was made
      });
    
      alert("bookin confirmed "); // Alerts the user that the booking was successful
      closePopup(); //closes the booking popup after successful booking
    } catch (error) {
     // Logs any errors that occur during the booking process to the console
      alert("Failed to book. Please try again."); // Alerts the user that the booking failed
    }
  }
    // This useEffect sets up a real-time listener to the Firestore database to fetch all bookings for the current room. It runs whenever the roomId changes
  useEffect(() => {
    if (!roomId) return; // If roomId is not available, exit early

    setIsLoading(true);  

    const bookingsRef = collection(db, "bookings");     //this creates a reference to the "bookings" collection in firestore
    const q = query(bookingsRef, where("roomId", "==", roomId));  // This query filters the "bookings" collection to only include documents where the "roomId" field matches the current roomId. This ensures that we only listen for bookings related to the specific room being viewed.

    // This listener stays active as long as the calendar is mounted
    const unsubscribe = onSnapshot(q,(querySnapshot) => { // Sets up a real-time listener on the query q. Whenever there is a change in the bookings for the current room
        // querySnapshot contains all documents that match the query at this moment

       // maps through each document to extract and format the data needed to display the booked dates on the calendar
        const dates = querySnapshot.docs.map((doc) => { 
          const data = doc.data();  //Gets the actual data object from the Firestore document
          return {                 //Returns a simplified object for each document
            room: data.roomId,    //Store the roomID from the document
            date: data.date? data.date.toDate().toDateString(): "Missing Date",  // If a date exists? Convert Firestore Timestamp → JavaScript Date → readable string:If no date exists, return "Missing Date" as a fallback
          };
        });
         // Update the state with the processed dates array
        // This will trigger a re-render so the UI reflects the latest bookings
        setBookedDates(dates);
        setIsLoading(false);      // Set loading to false since data has been successfully fetched
      },  // This is the error callback for the onSnapshot listener,It runs if something goes wrong while listening to Firestore
      (error) => {
        setIsLoading(false);     // Stop the loading state even if there was an error, so the UI doesn’t stay stuck in a loading state
      },
    );

    return () => unsubscribe(); // CLEANUP: This stops the listener when the user leaves the page
  }, [roomId]);   //this dependency array ensures that the useEffect runs again if the roomId changes

  return (
    <div className="container">
      <div className="header">
        <button onClick={prevMonth}>←</button>    {/*takes user to the previous month*/}
        <h2>
          {monthNames[month]} {year}        {/*Displays month name and year*/}
        </h2>
        <button onClick={nextMonth}>→</button>    {/*takes user to the next month*/}
      </div>

      <div className="weekdays">
        {/*displays names of weekdays*/}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (  
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="days">
        {/*Dispalys empty cells for days before the first day of the month*/}
        {Array(firstDay).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="day"></div> //creates an empty array with length firstDay:
          ))};

          {isLoading? (
            Array(35-firstDay).fill(null).map((_,i)=>( <div key={`empty-${i}`} className="day-loading"></div> ))
          ) : (daysArray.map((day) => {//displays each day of the month

          const dateObj = new Date(year, month, day);   //creates a Date object for the current day
          const dateString = dateObj.toDateString();     //converts the Date object to a readable string format, which will be used to compare with booked dates

          //We use .find() to search through the array of booked dates we fetched from Firestore.
          const bookingEntry = bookedDates.find(
            (b) => b.date === dateString && b.room === roomId, //(b) represents one single booking document/object from that array.
          );                                                   //Checks if the date string from the database (b.date) matches the date string date string of the specific calendar square we are currently drawing(dateString).
                                                              //Checks if the room id from the database (b.room) matches the date roomID of the specific room we are currently drawing(roomId).
          const isBooked = !!bookingEntry;
          //If bookingEntry found a match, isBooked becomes true.
          //If .find() returned undefined (no match), isBooked becomes false.

          return (

            //thse divs represent each day on the calendar. The background color changes based on whether the date is booked or not. If the date is not booked
            // clicking on it will trigger the bookFunction to open the booking popup for that date.
            <div key={day}
               className={`day ${isBooked ? "booked" : "available"}`}
              onClick={() => !isBooked && bookFunction(day)}
            >
              {day}
            </div>
          );
        })
        )}



      </div>
      {showpopup && (
        <div className="BookpopupContainer">
          <p onClick={closePopup}>X</p>
          <button onClick={() => saveUserDate(selectedDate, roomN)}>
            Book
          </button> {/* When the user clicks the "Book" button, 
           it calls the saveUserDate function, 
           passing in the selected date and room details to save the booking to the database.*/}
        </div>
      )}
    </div>
  );
}

export default Calendar;
