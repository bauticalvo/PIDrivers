import React from 'react'
import '../../estilos/style.css'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='landing'>
      <div className='div2'>
      <div className='div3'>
        <img src='https://seeklogo.com/images/F/formula-one-2017-logo-BCDDC2C9ED-seeklogo.com.png'></img>
      </div>
      <div className='div4'>
      </div>
      <div className='divbuttonlanding'>
          <button className='buttonlanding'>
          <Link to='/home'>Home</Link>
          </button>
      </div>
        </div>
    </div>
  )
}

export default Landing

