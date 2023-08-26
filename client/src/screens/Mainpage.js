import React from 'react'
import { Link } from 'react-router-dom'

function Mainpage() {
  return (
    <div className='mainpage'>
      <div className='col-md-12 text-center'>
        <img src='https://s3.amazonaws.com/logos.brandpa.com/uploads/ed16676758d7f774eaaf7381343e78ab/WowStay.png'/>
        {/* <h3 style={{color:'white',fontSize:'80px',textAlign:'center'}}>wowstay</h3> */}
        <Link to='/register'>
        <button className='btn btn-primary get'>Get Start</button></Link>
      </div>
    </div>
  )
}

export default Mainpage
