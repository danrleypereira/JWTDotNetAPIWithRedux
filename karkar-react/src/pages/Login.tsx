import React, { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUserThunk } from '../features/user/usersThunks'
import { AppDispatch } from '../store'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    try {
        dispatch(fetchUserThunk(email, password))
      navigate('/profile')
    } catch (error) {
      console.error('Error during login', error)
      // You may want to handle this error differently, e.g. show an error message in your UI
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
