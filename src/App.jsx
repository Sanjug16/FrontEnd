import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import './App.css'
import { LandingPage } from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import { UserDashBoard } from './components/UserDashBoard'
import { CarListings } from './components/CarListings'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile'
import { NewCar } from './components/NewCar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from root to landing page */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Main routes */}
        <Route path="/home" element={<LandingPage />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><UserDashBoard/></ProtectedRoute>} />

        <Route path="/login" element={<Login/>}/>

        <Route path="/profile" element={<Profile/>}/>

        <Route path="/addCar" element={<NewCar/>}/>

        <Route path="/register" element ={<Register/>}/>
        
        <Route path="/cars" element={<CarListings />} />
        
        {/* Catch all route - redirects to landing page */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
