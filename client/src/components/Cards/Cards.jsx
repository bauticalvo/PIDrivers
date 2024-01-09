import React from 'react'
import Card from '../Card/Card'


const Cards = ({driver}) => {
  return (
    <div>

      {
      driver.map(driver => 
      <Card 
        name={`${driver.forname}${driver.surname}`} 
        teams={driver.teams}
        image={driver.image}
      />)
      }
    </div>
    
  )
}

export default Cards