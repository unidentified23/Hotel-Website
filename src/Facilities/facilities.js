import React from 'react';
import room1 from "../images/gym.jpg";
import room2 from "../images/resturant.jpg";
import room3 from "../images/pool.jpg";
import room4 from "../images/bar.jpg";
import "./Facilities.css";

function facilities() {
   
    const Facilities = [
        {id:1, name:"Gym", picture:room1, Description:"Our gym has multiple equipment and instructors, The space is big enough"  },
        {id:2, name:"Resturant", picture:room2, Description:"Our resturant features different type of food and beverages, it also has outdoor area" },
        {id:3, name:"Swimming pool", picture:room3, Description:"We have 3 swimming pools one for kids (1m) and 2 for adults 4m  and 6m deep," },
        {id:4, name:"Bar", picture:room4, Description:"Our bar includes beers, cider, whiskey, gin, ram, vodka, cocktails and brandy " }

    ]

  return (
    <div className='faci-Content' >
      <h1 className='faci-H1' >facilities</h1>
      <div className='faci-container' >
   {Facilities.map((Facilitie)=>(
        <div key={Facilitie.id} className='faciContainer' >
          <img src={Facilitie.picture} alt={Facilitie.name} className='facilitiieName'/>
          <div className='nameContainer' >
            <h3 className='FacilitieName' >{Facilitie.name}</h3>
            <p className='description' >{Facilitie.Description}</p>

          </div>
        </div>
      ))}

      </div>
   

    </div>
  )
}

export default facilities