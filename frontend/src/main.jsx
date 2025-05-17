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
import Getstarted from './Components/Curriculum/getStarted.jsx'
// import SyllabusDashboard from './Components/syllabusNew/syllabusdash.jsx'
import SyllabusDashboard from './Components/syllabusNew/syllabusDashboard.jsx'
// import Curriculumdb from './Components/testingCS/Curriculumjdashboard.jsx'
import CurriculumDashboard from './Components/Curriculum/CurriculumDashboard.jsx'
import CurriculumBuilder from './Components/Curriculum/CurriculumBuilder.jsx'
import CurriculumCoursesView from './Components/Curriculum/CurriculumCourseView.jsx'
import NotFoundPage from './Components/NotFound.jsx'
const router=createBrowserRouter([
  { 
    element: <App/>,
    children:[

    ]
  },
  {
    path: '/about',
    element:<About/>
  },

  {
    path:'/syllabus',
    element:<SyllabusForm/>
  },
  {
    path: '/notfound',
    element:<NotFoundPage/>
  },
{
 path:'/syllabusform',
 element:<Syllabus/>
},
{
  path:'/syllabusnew',
  element:<SyllabusFormNEP/>
 },
  {
    path:'/',
    element:<HomePage/>
  },
  {
    path:'/getstarted',
    element:<Getstarted/>
  },
  {
    path:"/syllabusdashboard",
    element:<SyllabusDashboard/>
  },
  {
    path:"/syllabus-new/:id",
     element:<SyllabusFormNEP />
  },{
    path:"/curriculum-dashboard",
    element:<CurriculumDashboard/>
  },
  {
    path:'/curriculum-builder',
    element:<CurriculumBuilder/>
  },
  {
    path:"/curriculum-builder/:id", element:<CurriculumBuilder />
  },{
    path:"/curriculum-courses/:curriculumId",
    element:<CurriculumCoursesView/>
  },{
    path:"/syllabus-new/:curriculumId?", element:<SyllabusFormNEP />
  }
  

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
