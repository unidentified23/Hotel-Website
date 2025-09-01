import React from 'react'

function admin() {
  return (
    <div>
        <h1>Admin</h1>


         <div  className='inputCont'>
          <input type='text' placeholder='Room name' />
          <input type='text' placeholder='Room price' />
          <input type='text' placeholder='Bed type' />
         </div>
        
    </div>
  )
}

export default admin