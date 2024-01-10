import React, { useState } from 'react'
import '../../estilos/style.css'


export const Form = () => {

  const [driverData, setdriverData] = useState({
    forename: '',
    surname: '',
    description: '',
    image: '',
    nationality: '',
    dob: '',
    teams: []
  })

  const teams = ['Ferrari', 'Mercedes', 'Red Bull', 'Mustang']

  const handleChange = (event) =>{
    event.preventDefault();
    if(event.target.name === 'teams'){
      if(driverData.teams.includes(event.target.value)) return; 
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
  }

  return (
    <div className='form'>
      { console.log(driverData)},
      <form>
        <input type='text' name='forename' placeholder='Nombre' onChange={handleChange}></input>
        <input type='text' name='surname' placeholder='Apellido' onChange={handleChange}></input>
        <input type='text' name='description' placeholder='Descripcion' onChange={handleChange}></input>
        <input type='text' name='image' placeholder='URL de la imagen' onChange={handleChange}></input>
        <input type='text' name='nationality' placeholder='Nacionalidad' onChange={handleChange}></input>
        <input type='text' name='dob' placeholder='Fecha de Nacimiento' onChange={handleChange}></input>
        <div>
          <label>Seleccionar Escuderias</label>
          <select onChange={handleChange} name='teams' >
            {
              teams.map( team => <option key={team} value={team}>{team}</option>)
            }
          </select>
        </div>
            <input type='submit'></input>
      </form>
      </div>
  )
}
