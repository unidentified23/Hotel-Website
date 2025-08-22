import React from 'react';
import room1 from "./images/Dbed.jpg";
import room2 from "./images/luxbed.jpg";
import room3 from "./images/Dbed.jpg";
import room4 from "./images/luxbed.jpg";
import wifi  from "./images/wifi.png";
import roomServ from "./images/room service.png";
import tv from "./images/TV.png";
import dbed from "./images/single bed.png";
import sbed from  "./images/double bed.png"

function rooms() {

  const rooms = [
    {id: 1, name: "luxury suite", picture:room1, price: "R1700pn"  },
    {id: 2, name: "luxury suite", picture:room2, price: "R1500pn"  },
    {id: 3, name: "luxury suite", picture:room3, price: "R1000pn"   },
    {id: 4, name: "luxury suite", picture:room4, price: "R500pn"   }

  ]

  const otherrooms = [
    {id: 12, name: "luxury suite", picture:room1, price: "R1500pn" , NoOfBeds: "2s"  },
    {id: 22, name: "luxury suite", picture:room2, price: "R1600pn", NoOfBeds: "2s"    },
    {id: 33, name: "luxury suite", picture:room3, price: "R1800pn", NoOfBeds: "3s"   },
    {id: 43, name: "luxury suite", picture:room4, price: "R1900pn" , NoOfBeds: "3s"   }

  ]

  return (
    <div className='faciheader'>
    <h1 className='roomH1'>Rooms & Suites</h1>
     
      <div className='rjk'>
    {rooms.map((room, id)=>(
      <div key={room.id} className='roomContainer'  >
        <p className='roomName' >{room.name}</p>
        <img src={room.picture} alt={room.name} className='roomPic' />
        <p className='roomPrice' >{room.price}</p>-
        <div className='iconContainer' >
        <img src={wifi} alt='wifi' className='wifi' />
        <img src={roomServ} alt='wifi' className='wifi' />
        <img src={tv} alt='wifi' className='wifi' />
        <img src={dbed} alt='wifi' className='wifi' />
        </div>
        </div>
    ))}

    </div>
    <div className='otherRow' >
               {otherrooms.map((room, id)=>(
      <div key={room.id} className='otherRoomContainer'  >
        <p className='oroomName' >{room.name}</p>
        <img src={room.picture} alt={room.name} className='oroomPic' />
        <p className='oroomPrice' >{room.price}</p>-
        <div className='iconContainer2' >
        <img src={wifi} alt='wifi' className='wifi' />
        <img src={tv} alt='wifi' className='wifi' />
        <p className='NoOfBeds'>{room.NoOfBeds} </p>
        <img src={sbed} alt='wifi' className='wifi' />
        </div>
      </div>
    ))}


    </div>

    </div>
    
  
  )
};


export default rooms;