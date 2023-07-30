import React, { useEffect } from 'react'
import { User, Token } from '../types'
import { selectors } from '../features/user'
import { useSelector } from 'react-redux'
import { setTokenAction } from '../features/user/usersActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Profile: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user: User = useSelector(selectors.getUserValue)
  const token: Token = useSelector(selectors.getUserToken)
  // useEffect with empty dependency array acts as componentDidMount,
  // meaning it runs once after the first render.
  // It is empty here because we're not performing any side effects.
  useEffect(() => {}, [])

  const cleanToken = () => {
    localStorage.removeItem('token')
    navigate('/login')
    dispatch(setTokenAction({} as Token))
  }
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{user.email}</h2>
      <p>{user.id}</p>
      <p>Expira em: {new Date(token.expiration).toString()}</p>
      <p>Token: {token.token}</p>
      <div>
        <p>Permissões:</p>
        {token.roles?.map((permission) => (
          <p key={permission}>{permission}</p>
        ))}
      </div>
      {/* logout */}
      <button onClick={() => cleanToken()}>Logout</button>
    </div>
  )
}
