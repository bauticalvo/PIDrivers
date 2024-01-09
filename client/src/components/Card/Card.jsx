import React from 'react'

const Card = ({name, teams, image}) => {
  return (
    <div>
      <h3>Nombre:{name}</h3>
      <h3>Escuderias:{teams}</h3>
      <h3>{image}</h3>
    </div>
  )
}

export default Card