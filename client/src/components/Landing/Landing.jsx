import React from 'react'
import '../../estilos/style.css'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='landing'>
        <button className='buttonlanding'>
        <Link to='/home'>Home</Link>
      </button>
    </div>
  )
}

export default Landing

