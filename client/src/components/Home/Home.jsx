import React from 'react'
import '../../estilos/style.css'
import Cards from '../Cards/Cards'

const Home = (drivers) => {
  return (
    <div className='home'>
        <h1>home</h1>
        <Cards driver={drivers}></Cards>
    </div>
  )
}

export default Home