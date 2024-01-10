import React from 'react'
import '../../estilos/style.css'
import Cards from '../Cards/Cards'

const Home = () => {

  const drivers = [{forename: 'Lewis', surname:'Hamilton', 
  teams: 'Ferrari', image: 'no pic' },{forename: 'Lionel', surname:'Messi', 
  teams: 'Red Bull', image: 'goat'  },{forename: 'Bauti', surname:'Calvo', 
  teams: 'Mercedes', image: 'no pic' }]

  return (
    <div className='home'>
        <h1>home</h1>
        <Cards drivers={drivers}></Cards>
    </div>
  )
}

export default Home