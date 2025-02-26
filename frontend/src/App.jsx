import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import SyllabusForm from './Components/syllabus'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/syllabus" element={<SyllabusForm/>} />
      </Routes>
    </Router>
  )
}

export default App
