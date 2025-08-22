import React from 'react';
import room1 from "./images/gym.jpg";
import room2 from "./images/resturant.jpg";
import room3 from "./images/pool.jpg";
import room4 from "./images/bar.jpg";

function facilities() {
   
    const Facilities = [
        {id:1, name:"Gym", picture:room1, Description:"Our gym has multiple aquipment and instructors, The space is big enough"  },
        {id:2, name:"Resturant", picture:room2, Description:"Our resturamt features different type of food and bevereges, it also has outdoor area" },
        {id:3, name:"Swimming pool", picture:room3, Description:"We have 3 swimming pools one for kids (1m) and 2 for adults 4m  and 6m deep," },
        {id:4, name:"Bar", picture:room4, Description:"Our bar includes beers,cider,whiskey,gin,ram,vodka and brandy " }

    ]

  return (
    <div className='faciheader'>
      <h1 className='roomH1' >facilities</h1>
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
  )
}

export default facilities