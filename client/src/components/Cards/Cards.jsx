import React from 'react'
import Card from '../Card/Card'


const Cards = ({drivers}) => {
  return (
    <div>

      {
      drivers.map(driver => 
      <Card 
        name={`${driver.forename}${' '}${driver.surname}`} 
        teams={driver.teams}
        image={driver.image}
      />)
      }
    </div>
    
  )
}

export default Cards