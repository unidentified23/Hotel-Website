import React from "react";
import Slideshow from "./slideshow";
import hpic from "./images/front.jpg";
import resturant from "./images/resturant.png";
import parking from "./images/parcking.png";
import swimming from "./images/swimming.png";
import wifi from "./images/wifi.png";
import gym from "./images/output-onlinepngtools(2).png";
import roomServ from "./images/room service.png";


function Home() {
  return (
    <div className="faciheader" >
      <div className="HContainer">
        <img src={hpic} alt="pich" className="himg" />
        <h1 className="hname">Space Paradise</h1>
        <p className="slogan">Your comfort is our number one priority</p>
        <div class="stars">
          <span>★★★★★</span>
        </div>

        <div className="searchbar">
          <select className="selectbtn">
            <option value="">room type</option>
            <option value="Small">Apple</option>
            <option value="Luxury suite">Banana</option>
            <option value="Top noch">Orange</option>
          </select>
          <select className="selectbtn">
            <option value="">No of people</option>
            <option value="1">Apple</option>
            <option value="2">Banana</option>
            <option value="3">Orange</option>
          </select>
          <select className="selectbtn">
            <option value="">Sharing</option>
            <option value="Small">No</option>
            <option value="Luxury suite">Yes, 2</option>
            <option value="Top noch">yes, 3</option>
          </select>
          <select className="selectbtn">
            <option value="">no of beds</option>
            <option value="Small">1 king/queen size</option>
            <option value="Luxury suite">2 single</option>
            <option value="Top noch">3 single</option>
          </select>
          <button className="Explorebtn">explore</button>
        </div>
      </div>
      <h2 className="OFI"> Our facilities include </h2>
      <div className="facilitieIcons">
        <div className="imageContainer"><img src={wifi} alt="wifi" className="facilitieIcon" />
        <p className="iconName" >WI-FI</p>
        </div>
        <span className="imageContainer" > <img src={gym} alt="wifi" className="facilitieIcon" />
        <p className="iconName" >Gym</p>
        </span>
        <span className="imageContainer" > <img src={swimming} alt="wifi" className="facilitieIcon" />
        <p className="iconName" >Swimming Pool</p>
        </span>
        <span className="imageContainer" > <img src={parking} alt="wifi" className="facilitieIcon" />
        <p className="iconName" >Parking</p>
        </span>
        <span className="imageContainer" ><img src={resturant} alt="wifi" className="facilitieIcon" />
        <p className="iconName" >Resturant</p>
        </span>
        <span className="imageContainer" ><img src={roomServ} alt="wifi" className="facilitieIcon" />
        <p className="iconName" >Room service</p>
        </span>
      </div>

      <Slideshow />

      
    </div>
  );
}

export default Home;
