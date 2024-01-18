import React from 'react'
import { useDispatch } from 'react-redux'
import { driverSearch } from '../../Redux/actions';

const SearchBar = () => {

  const dispatch = useDispatch();

  const handleSubmit= (event)=>{
    event.preventDefault()
    dispatch(driverSearch(document.getElementById('search').value))
  }

  return (
    <div>
      <label>Ingrese un Nombre</label>
      <div>
        <input id='search' type='text' ></input>
        <button type='submit' onClick={handleSubmit} className='navbuttoms1'>🔍</button>
      </div>
      
    </div>
  )
}

export default SearchBar