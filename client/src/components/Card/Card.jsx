import React from 'react'
import {Link} from 'react-router-dom'

const Card = ({name,surname, teams, image,id}) => {
  return (
    <div className='card'>
      <h3>Nombre: {name} {surname}</h3>
      <h3>Escuderias: {teams}</h3>
      <Link to={`/detail/${id}`}><img className='imgCard'  src={image} alt={name} /></Link>
      
    </div>
  )
}

export default Card