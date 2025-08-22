import React from 'react'
import phone from "./images/output-onlinepngtools(4).png"
import whatsapp from "./images/output-onlinepngtools(3).png"
import mail from "./images/output-onlinepngtools.png"
import insta from "./images/insta.png"

function bottomNavbar() {
  return (
    <div className='bottomNavheader'>
    
    <div className='AboutUs'>
      <h4>About us</h4>
      <p>
         Space paradise is a luxury hotel in Limpopo, 
         offering a unique blend of comfort and natural beauty.
          Located on moutains of venda, named chigaro
          it provides 220 guest rooms and suites, all with stunning nature views and private balconies.
           The resort boasts exceptional amenities, including a spa, swimming pools, and a variety of dining options, 
           making it a popular choice for families, solo travelers, and conference attendee
      </p>
    </div>

    <div className='Contacts'>
      <h4>Contacts</h4>
      <table className='contactTab'>
        <tr>
          <td><img src={phone} alt='phoeicon' width={30}  /> </td>
          <td>015 478 9710</td>
        </tr>
        <tr>
           <td> <img src={whatsapp} alt='appicon' width={30}  /> </td>
           <td>076 391 3499</td>
        </tr>
        <tr>
          <td> <img src={mail} alt='mailicon' width={30}  /> </td>
          <td>spaceparadise@zmail.com</td>
        </tr>
        <tr>
          <td> <img src={insta} alt='mailicon' width={30}  /> </td>
          <td>Space_Paradise</td>
        </tr>
      </table>
    
    </div>
    
    
    </div>
  )
}

export default bottomNavbar