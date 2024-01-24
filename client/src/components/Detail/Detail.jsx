import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getDriver } from '../../Redux/actions';

const Detail = () => {

  const dispatch = useDispatch();
  const params = useParams()
  const driverDetail = useSelector(state => state.driverDetail)    
  const driver={}


  useEffect(()=>{
    dispatch(getDriver(params.id))
    return ()=>{
      
    }
  },[])
  
  let d = driverDetail;console.log(d);
    if(d.hasOwnProperty('name')){
      driver.name= d.name.forename
      driver.surname= d.name.surname
      driver.image = d.image.url
      driver.teams = d.teams
    } else  if(d.hasOwnProperty('forename')){
      driver.name= d.forename
      driver.surname = d.surname
      driver.image = d.image
      driver.teams = d.teams.join(',')
    }



  return (

    <div className='divdetail'>
      <div className='divdetail1'> 
      <h4>Id:{d.id}</h4>
      <h4>Nombre: {driver.name} {driver.surname}</h4>
      <h4>Nacionalidad: {d.nationality}</h4>
      <h4>Fecha de nacimiento: {d.dob}</h4>
      <h4>Escuderías: {driver.teams}</h4>
      <h4>Descripcion: {d.description}</h4>
      </div>
      <div className='divdetail2'>
      <img className='imgdetail' src={driver.image}></img>
      </div>
     

    </div>
  )
}

export default Detail