import React from 'react'
import Card from '../Card/Card'

const URL= 'https://img.freepik.com/fotos-premium/retrato-piloto-f1-casco-piloto-formula-parado-pista-carreras-despues-competencia_777271-15992.jpg'

const Cards = ({drivers}) => {
  return (
    <div className='cards'>
      

      
      { drivers &&
      drivers.map(driver => 

        {if(driver.hasOwnProperty('forename')){    
          if(!driver.image) driver.image = URL
          let driverDB = {}
          if(driver && driver.teams) driverDB.teams = driver.teams.join(',')
          return (
            
          <Card 
            key={driver.id}
            id={driver.id}
            name={driver.forename} 
            surname={driver.surname}
            teams={driverDB.teams}
            image={driver.image}
          />)
        } else{
          if(!driver.image.url) driver.image.url = URL     // Si un driver no tiene fotos se le da una default
          return(                                          //Muestra los drivers de la api
          <Card 
            key={driver.id}
            id={driver.id}
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