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
import ProtectedRoute from "./protected_routes";
import CourseDetails from "../pages/course_details";

function AppRoutes(){

 return(
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
      path="/course/:id"
      element={<CourseDetails />}
    />
    
    <Route
      path="/projects/*"
      element={<Projects />}
    />
    
    <Route
      path="/community/*"
      element={<Community />}
    />
    
    {/* Protected Routes */}
    <Route
      path="/student/*"
      element={
        <ProtectedRoute>
          <StudentDashboard />
        </ProtectedRoute>
      }
    />
    
    <Route
      path="/instructor/*"
      element={
        <ProtectedRoute>
          <InstructorDashboard />
        </ProtectedRoute>
      }
    />
    
    <Route
      path="/admin/*"
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
 );
}

export default AppRoutes;