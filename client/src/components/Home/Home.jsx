import React, { useEffect } from 'react'
import '../../estilos/style.css'
import Cards from '../Cards/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { getDriver } from '../../Redux/actions'

const Home = () => {

  const dispatch = useDispatch()
  const allDrivers = useSelector(state => state.allDrivers)       // traemos del estado global allDrivers, que contiene los drivers del back

  console.log(allDrivers);

  useEffect(()=>{
    dispatch(getDriver())
  },[])
  return (
    <div className='home'>
        <Cards drivers={allDrivers}></Cards>
    </div>
  )
}

export default Home