import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Cars } from './pages/Cars'
import { Profile } from './pages/Profile'
import { Login } from './pages/Login'
import { VehicleForm } from './components/VehicleForm'
import { Token } from './types'
import { useDispatch } from 'react-redux'
import { setTokenAction } from './features/user/usersActions'

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    let token: Token = JSON.parse(localStorage.getItem('token')?.toString() || '{}');
    dispatch(setTokenAction(token))
  }, [])
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit/:id" element={<VehicleForm />} />
          <Route path="/new" element={<VehicleForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
