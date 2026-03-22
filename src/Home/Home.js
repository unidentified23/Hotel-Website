import Slideshow from "../components/Slideshow/slideshow";
import hpic from "../images/front.jpg";
import resturant from "../images/resturant.png";
import parking from "../images/parking.png";
import swimming from "../images/swimming-pool.png";
import wifi from "../images/wifi.png";
import gym from "../images/gym.png";
import roomServ from "../images/room service.png";
import "./Home.css";

function Home() {
  return (
    <div className="Home-Content">
      <div className="HContainer">
        <img src={hpic} alt="pich" className="himg" />
        <h1 className="hname">Space Paradise</h1>
        <p className="slogan">Your comfort is our number one priority</p>
        <div class="stars">
          <span>★★★★★</span>
        </div>
      </div>
      <h2 className="OFI"> Our facilities include </h2>
      <div className="facilitieIcons">
        <div className="imageContainer">
          <img src={wifi} alt="wifi" className="facilitieIcon" />
          <p className="iconName">WI-FI</p>
        </div>
        <span className="imageContainer">
          {" "}
          <img src={gym} alt="wifi" className="facilitieIcon" />
          <p className="iconName">Gym</p>
        </span>
        <span className="imageContainer">
          {" "}
          <img src={swimming} alt="wifi" className="facilitieIcon" />
          <p className="iconName">Swimming Pool</p>
        </span>
        <span className="imageContainer">
          {" "}
          <img src={parking} alt="wifi" className="facilitieIcon" />
          <p className="iconName">Parking</p>
        </span>
        <span className="imageContainer">
          <img src={resturant} alt="wifi" className="facilitieIcon" />
          <p className="iconName">Resturant</p>
        </span>
        <span className="imageContainer">
          <img src={roomServ} alt="wifi" className="facilitieIcon" />
          <p className="iconName">Room service</p>
        </span>
      </div>

       <Slideshow />
    </div>
  );
}

export default Home;
