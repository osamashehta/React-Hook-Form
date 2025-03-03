import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import LogIn from './pages/LogIn/LogIn'

function App() {

  return (
  <>
  <Routes>
    <Route path='/' element = {<Home/>} />
    <Route path='/register' element = {<Register/>}/>
    <Route path='/login' element = {<LogIn/>}/>
  </Routes>
  </>
  )
}

export default App
