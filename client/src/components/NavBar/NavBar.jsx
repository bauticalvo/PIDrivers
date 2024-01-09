import React from 'react'
import { Link } from 'react-router-dom'
import '../../estilos/style.css'
import SearchBar from '../SearchBar/SearchBar'


const NavBar = () => {
  return (
    <div className='navBar'>
      
      <div>
        <button className='navbuttoms'>
        <Link to='/home'>Home</Link>
        </button>
      </div>
      <div>
        <button className='navbuttoms'>
          <Link to='/form'>Crear un Driver</Link>
        </button>
      </div>
      <div>
        <SearchBar></SearchBar>
      </div>
    </div>
  )
}

export default NavBar