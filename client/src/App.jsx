import { Routes , Route, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'
import NavBar from './components/NavBar/NavBar'
import { Form } from './components/Form/Form'
import Detail from './components/Detail/Detail'


function App() {

  const location = useLocation()
  const drivers = [{forename: 'lewis', surname:'Hamilton', 
  teams: 'Ferrari', image: 'no pic' }]


  return (

      <div>
         { 
            location.pathname !== '/' &&  <NavBar />
         }
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/home' element={<Home driver={drivers}/>} />
          <Route path='/form' element={<Form/>} />
          <Route path='/detail' element={<Detail/>} />
        </Routes>

      </div>
      
   
  )
}

export default App
