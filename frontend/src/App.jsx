import './App.css'
import { BrowserRouter as Router, Routes, Outlet } from 'react-router-dom';
import Home from './Components/Home'
import SyllabusForm from './Components/syllabus'
import Navbar from './Components/Navbar'
import HomePage from './Components/Home';
function App() {

  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  )
}

export default App
