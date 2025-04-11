import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Syllabus from './Components/syllabus.jsx'
import HomePage from './Components/Home.jsx'
import About from './Components/About.jsx'
import SyllabusForm from './Components/Syllabus/SyllabusForm.jsx'
import SyllabusFormNEP from './Components/syllabusNew/SyllabusFormNEP.jsx'

const router=createBrowserRouter([
  { 
    element: <App/>,
    children:[
      {
        path: '/about',
        element:<About/>
      },

    ]
  },
  {
    path:'/syllabus',
    element:<SyllabusForm/>
  },
{
 path:'/syllabusform',
 element:<Syllabus/>
},
{
  path:'/syllabusNew',
  element:<SyllabusFormNEP/>
 },
  {
    path:'/',
    element:<HomePage/>
  
  }
   

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
