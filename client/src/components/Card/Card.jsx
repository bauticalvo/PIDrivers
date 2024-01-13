import React from 'react'

const Card = ({name,surname, teams, image}) => {
  return (
    <div>
      <h3>Nombre: {name} {surname}</h3>
      <h3>Escuderias: {teams}</h3>
      <img className='imgCard'  src={image} alt={name} />
    </div>
  )
}

export default Card