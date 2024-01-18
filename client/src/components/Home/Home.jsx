import React, { useEffect } from 'react'
import '../../estilos/style.css'
import Cards from '../Cards/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { filter, filterTeams, getDrivers, getTeams, order, orderDob, page, refresh} from '../../Redux/actions'

const Home = () => {

  const dispatch = useDispatch()
  const allDrivers = useSelector(state => state.allDrivers)       // traemos del estado global allDrivers, que contiene los drivers del back
  const allTeams = useSelector(state => state.allTeams)

  useEffect(()=>{
    dispatch(getDrivers())
    dispatch(getTeams())
  },[])

  const pagination =(event)=>{
    dispatch(page(event.target.name))
  }

  const filtered = (event)=>{
    dispatch(filter(event.target.value))
  }
  const filteredTeams = (event)=>{
    dispatch(filterTeams(event.target.value))
  }

  const ordered =(event)=>{
    dispatch(order(event.target.name))
  }
  const orderedDob =(event)=>{
    dispatch(orderDob(event.target.name))
  }
  
  const orderTeams = allTeams.sort((a,b)=>{
    return a.localeCompare(b, 'es', { sensitivity: 'base' })
  })

 
  return (
    <div className='home'>
      <div className='filtros'>
        <div>
          <button className='button2' name='AZ' onClick={ordered}>A-Z</button>
          <button className='button2' name='ZA' onClick={ordered}>Z-A</button>
        </div>
        <div>
          <button className='button2' name='Mayor a Menor' onClick={orderedDob}>M-m</button>
          <button className='button2' name='Menor a Mayor' onClick={orderedDob}>m-M</button>
        </div>
        <div>
          <button className='button2' name='prev' onClick={pagination}>⬅️</button>
          <button className='button2' name='next' onClick={pagination}>➡️</button>
        </div>
        <div className='divselect'>
          <label>Filtros</label>
          <select onChange={filtered}>
            <option value='All'  >Todos</option>
            <option value='Api' >Api</option>
            <option value='Base de datos'  >Base de datos</option>
          </select>
      </div>
      <div className='divselect'>
          <label>Filtro por equipo</label>
          <select onChange={filteredTeams} name='teams'>
          <option key='todos' value='todos'>Todos</option>
          {
              orderTeams.map( team => 
              <option 
              key={team} 
              value={team}>
              {team}</option>)
            }
          </select>

      </div>
     
      </div>
        <Cards drivers={allDrivers}></Cards>
    </div>
  )
}

export default Home