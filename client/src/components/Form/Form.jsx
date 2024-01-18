import React, { useEffect, useState } from 'react'
import '../../estilos/style.css'
import validation from '../Util/validation'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams, postDriver } from '../../Redux/actions'

export const Form = () => {

  const dispatch = useDispatch()
  const allTeams = useSelector(state => state.allTeams)
  const teams = allTeams.sort((a,b)=>{
    return a.localeCompare(b, 'es', { sensitivity: 'base' })
  })

  useEffect(()=>{
    dispatch(getTeams())
  },[])

  const [driverData, setdriverData] = useState({
    forename: '',
    surname: '',
    description: '',
    image: '',
    nationality: '',
    dob: '',
    teams: []
  })

  const [errors, setErrors] = useState({
    forename: '',
    surname: '',
    description: '',
    image: '',
    nationality: '',
    dob: '',
    teams: ''
  })


  const validate = (driverData, name)=>{

   const regexChar = /^[a-zA-Z\s'-ñ]+$/
   const regexDescription = /^[a-zA-Z0-9\s,.ñ]+$/
   const regexDob = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9][0-9]|20[0-1][0-9]|202[0-3])$/
   const regexImage = /^data:image\/(png|jpeg|jpg|gif);base64,([a-zA-Z0-9+/]+={0,2})$/
   const regexImage2 = /^https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/[^\/]*)*\/?$/


   // ---- Validacion de forename ---- //
    if(name === 'forename'){
      let fore = driverData.forename
      if(fore.length === 0) setErrors({...errors, forename: "Debe ingresar un nombre"})
      if(fore.length >0 ){
        if(fore.length > 15) setErrors({...errors, forename: "El nombre no debe tener mas de 15 caracteres"})
        if(fore.length < 3)setErrors({...errors, forename: "El nombre no debe tener menos de 3 caracteres"})
        if(fore.length>= 3 && fore.length <= 15 )setErrors({...errors, forename: ""})
        if(!regexChar.test(driverData.forename)) setErrors({...errors, forename: 'El nombre no debe tener caracteres especiales'})
    }
    }
    // ---- Validacion de surname ---- //
    if(name === 'surname'){
      let sur = driverData.surname
      if(sur.length === 0) setErrors({...errors, surname: "Debe ingresar un apellido"})
      if(sur.length >0 ){
        if(sur.length > 15) setErrors({...errors, surname: "El apellido no debe tener mas de 15 caracteres"})
        if(sur.length < 3)setErrors({...errors, surname: "El apellido no debe tener menos de 3 caracteres"})
        if(sur.length>= 3 && sur.length <= 15 )setErrors({...errors, surname: ""})
        if(!regexChar.test(driverData.surname)) setErrors({...errors, surname: 'El apellido no debe tener caracteres especiales'})
    }
    }
    // ---- Validacion de description ---- //
    if(name === 'description'){
      let desc = driverData.description
      if(desc.length === 0) setErrors({...errors, description: "Debe ingresar una descripcion"})
      if(desc.length > 0){
        if(desc.length > 100) setErrors({...errors, description: "La descripcion no debe tener mas de 100 caracteres"})
        if(desc.length < 10)setErrors({...errors, description: "La descripcion no debe tener menos de 10 caracteres"})
        if(desc.length>= 10 && desc.length <= 100 )setErrors({...errors, description: ""})
        if(!regexDescription.test(driverData.description)) setErrors({...errors, description: 'La descripcion no debe tener caracteres especiales'})
      }
    }
    // ---- Validacion de image ---- //
    if(name === 'image'){
      let img = driverData.image
      if(img.length === 0) setErrors({...errors, image: "Debe ingresar una URL"})
      if(img.length > 0){
        if(img.length>= 1 )setErrors({...errors, image: ""})
        if(!regexImage.test(driverData.image) && !regexImage2.test(driverData.image)) setErrors({...errors, image: 'La URL debe ser valida'})
      }
    }

    // ---- Validacion de dob ---- //
    if(name === 'dob'){
      let date = driverData.dob
      if(date.length === 0) setErrors({...errors, dob: "Debe ingresar la fecha de nacimiento"})
      if(date.length > 0){
        if(!regexDob.test(driverData.dob)) setErrors({...errors, dob: 'Debe ingresar una fecha valida'})
        else setErrors({...errors, dob: ''})
      }
    }
    // ---- Validacion de nationality ---- //
    if(name === 'nationality'){
      let nation = driverData.nationality
      if(nation.length === 0) setErrors({...errors, nationality: "Debe ingresar una nacionalidad"})
      if(nation.length > 0){
        if(nation.length>= 1 && nation.length <= 10 )setErrors({...errors, nationality: ""})
        if(!regexChar.test(driverData.nationality)) setErrors({...errors, nationality: 'La nacionalidad no debe tener caracteres especiales'})
      }
    }
    // ---- Validacion de teams ---- //
    
  }


  const handleChange = (event) =>{
    event.preventDefault();
    if(event.target.name === 'teams'){
      if(driverData.teams.includes(event.target.value)) return;    // para que no se repita los teams en el select
      setdriverData({
        ...driverData,
        [event.target.name]: [...driverData[event.target.name], event.target.value]
      })
      return
    }
    setdriverData({
      ...driverData,
      [event.target.name]: event.target.value
    })
    validate({
      ...driverData,
      [event.target.name]: event.target.value
        },event.target.name
        )
  }
  
  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(driverData);
    dispatch(postDriver(driverData))
  }

  const deleteFunction = (team) => {
    setdriverData({
      ...driverData,
      teams: driverData.teams.filter((t) => t !== team)
    });
  };
   
  
  const disabledFunction = () =>{
    let disabledVar = true;
    
    for(let data in driverData){
      if(driverData[data] === '' || errors[data] !== '') return true;
    }
    if(driverData.teams.length > 0 ) return false
    return disabledVar;

  
  
  }
  return (
    <div className='form'> {console.log(driverData)}
      <form onSubmit={handleSubmit}>
        <input type='text' name='forename' placeholder='Nombre' onChange={handleChange} ></input>
        <p>{errors.forename ? errors.forename : null}</p>
        <input type='text' name='surname' placeholder='Apellido' onChange={handleChange} ></input>
        <p>{errors.surname ? errors.surname : null}</p>
        <input type='text' name='nationality' placeholder='Nacionalidad' onChange={handleChange} ></input>
        <p>{errors.nationality ? errors.nationality : null}</p>
        <input type='text' name='image' placeholder='URL de la imagen' className='image' onChange={handleChange} ></input>
        <p>{errors.image ? errors.image : null}</p>
        <input type='text' name='dob' placeholder='Fecha de Nacimiento' onChange={handleChange} ></input>
        <p>{errors.dob ? errors.dob : null}</p>
        <input type='text' name='description' placeholder='Descripcion' className='desc' onChange={handleChange} ></input>
        <p>{errors.description ? errors.description : null}</p>
        <div>
          <label>Seleccionar Escuderias</label>
          <select onChange={handleChange} name='teams' >
            
            {
              teams.map( team => 
              <option 
              key={team} 
              value={team}>
              {team}</option>)
            }
          </select>

          {
            driverData.teams.map( team =>
              <div key={team}>
                <span>{team}</span>
                  <button 
                   type='button' 
                   onClick={() =>deleteFunction(team)}>
                   🗑️</button>
              </div>)
          }
        </div>
            <input
             type='submit'
             disabled={ disabledFunction()}
             ></input>
      </form>
      </div>
  )
}
