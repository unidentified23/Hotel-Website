import "./Bookings.css"
import room1 from "../images/Dbed.jpg";
import room2 from "../images/luxbed.jpg";
import room3 from "../images/Dbed.jpg";
import room4 from "../images/luxbed.jpg";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseconfig";
import { useAuth } from "../authcontext";

function Bookings() {

  const [bookedDates, setBookedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [bookedRooms, setBookedRooms] = useState([]);
  const Email = user ? user.email : null;
  console.log("user emailll is ", Email);

  const rooms = [
    { id: 1, name: "luxury suite", picture: room1, price: "R1700pn" },
    { id: 2, name: "luxury suite", picture: room2, price: "R1500pn" },
    { id: 3, name: "luxury suite", picture: room3, price: "R1000pn" },
    { id: 4, name: "luxury suite", picture: room4, price: "R500pn" },
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

  const allRooms = [...rooms, ...otherrooms];


  // This useEffect sets up a real-time listener to the Firestore database to fetch all bookings for the current user.
  useEffect(() => {
    if (!Email) return; // If email is not available, exit early

    setIsLoading(true);

    const bookingsRef = collection(db, "bookings");     //this creates a reference to the "bookings" collection in firestore
    const q = query(bookingsRef, where("email", "==", Email));  // This query filters the "bookings" collection to only include documents where the "email" field matches the current user's email. This ensures that we only listen for bookings related to the specific user.

    // This listener stays active as long as the calendar is mounted
    const unsubscribe = onSnapshot(q, (querySnapshot) => { // Sets up a real-time listener on the query q. Whenever there is a change in the bookings for the current room
      // querySnapshot contains all documents that match the query at this moment

      // maps through each document to extract and format the data needed to display the booked dates on the calendar
      const dates = querySnapshot.docs.map((doc) => {
        const data = doc.data();  //Gets the actual data object from the Firestore document
        return {                 //Returns a simplified object for each document
          roomID: data.roomId,    //Store the roomID from the document
          date: data.date ? data.date.toDate().toDateString() : "Missing Date",  // If a date exists? Convert Firestore Timestamp → JavaScript Date → readable string:If no date exists, return "Missing Date" as a fallback
        };
      });
      // Update the state with the processed dates array
      // This will trigger a re-render so the UI reflects the latest bookings
      setBookedDates(dates);
      setIsLoading(false);      // Set loading to false since data has been successfully fetched
      console.log("booked dates are ", dates);
    },  // This is the error callback for the onSnapshot listener,It runs if something goes wrong while listening to Firestore
      (error) => {
        console.error("Listener failed:", error);  // Log the error to the console for debugging
        setIsLoading(false);     // Stop the loading state even if there was an error, so the UI doesn’t stay stuck in a loading state
      },
    );
    return () => unsubscribe(); // CLEANUP: This stops the listener when the user leaves the page
  }, [Email]);

  useEffect(() => {

    const results = bookedDates.map(b => {
      const room = allRooms.find(r => r.id === b.roomID);
      if (room) {
        return { ...room, date: b.date }; // attach the date
      }
      return null; // if no room found
    })
      .filter(Boolean); // remove nulls
    setBookedRooms(results);

    console.log("booked rooms with dates: ", results);
  }, [bookedDates]);
  return (
    <div className="BookingContent">
      <h1 className="H1-Bookings">Bookings</h1>
      {isLoading ? (
        <div className="bookedRoomsContainer">

          {[1, 2, 3, 4].map((n) => <div key={n} className="skeleton-card" />)}
        </div>
      ) : (
        <div className="bookedRoomsContainer">
          {bookedDates.length > 0 ? (
            bookedRooms.map((room, index) => (

              <div key={index} className="bookedRoom">

                <img src={room.picture} alt={room.name} className="roomPic" />
                <p >{room.date}</p>
                <p>{room.name}</p>


              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      )}



    </div>
  )
}

export default Bookings
