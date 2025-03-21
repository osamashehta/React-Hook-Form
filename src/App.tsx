import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import LogIn from './pages/LogIn/LogIn'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
  <>
 <ToastContainer />
  <Routes>
    <Route path='/home' element = {<Home/>} />
    <Route path='/register' element = {<Register/>}/>
    <Route path='/' element = {<LogIn/>}/>
  </Routes>
  </>
  )
}

export default App
