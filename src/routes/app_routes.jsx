import {
Routes,
Route

} from "react-router-dom";

import Home from "../pages/home";
import About from "../pages/about";
import Services from "../pages/services";
import Courses from "../pages/courses";
import Projects from "../pages/projects";
import Community from "../pages/community";
import StudentDashboard from "../pages/students";
import InstructorDashboard from "../pages/instructors";
import AdminDashboard from "../pages/admin";
import Auth from "../pages/auth";


function AppRoutes(){

 return(

<>
  <Routes>
       <Route
    path="/auth/*"
    element={<Auth />}
   />

   <Route
    path="/"
    element={<Home />}
   />
   <Route
    path="/about/*"
    element={<About />}
   />
   <Route
    path="/services/*"
    element={<Services />}
   />
   <Route
    path="/courses/*"
    element={<Courses />}
   />
   <Route
    path="/projects/*"
    element={<Projects />}
   />
   <Route
    path="/community/*"
    element={<Community />}
   />
     <Route
    path="/student/*"
    element={<StudentDashboard />}
   />
   <Route
    path="/instructor/*"
    element={<InstructorDashboard />}
   />
   <Route
    path="/admin/*"
    element={<AdminDashboard />}
   />

  </Routes>
</>



 );
}

export default AppRoutes;