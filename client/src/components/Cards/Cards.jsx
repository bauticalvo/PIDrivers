import React from 'react'
import Card from '../Card/Card'


const Cards = ({drivers}) => {
  return (
    <div>

      {
      drivers.map(driver => 

        {if(driver.hasOwnProperty('forename')){     //Muestra los drivers de la DB
          console.log(driver);
          return (
          <Card 
            key={driver.forename}
            name={driver.forename} 
            surname={driver.surname}
            teams={driver.teams}
            image={driver.image}
          />)
        } else{
          return(                                   //Muestra los drivers de la api
          <Card 
            key={driver.name.forename}
            name={driver.name.forename} 
            surname={driver.name.surname}
            teams={driver.teams}
            image={driver.image.url}
          />)
        }
      }
      )
      }
    </div>
    
  )
}

export default Cards