import React, { useEffect } from 'react'
import { User } from '../types'

import { selectors } from '../features/user'
import { useSelector } from 'react-redux'

export const Profile: React.FC = () => {
  const user: User = useSelector(selectors.getUserValue)
  const token = useSelector(selectors.getUserToken)
  // useEffect with empty dependency array acts as componentDidMount,
  // meaning it runs once after the first render.
  // It is empty here because we're not performing any side effects.
  useEffect(() => {}, [])

  // render the user data
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{user.email}</h2>
      <p>{user.id}</p>
      <p>{token}</p>
    </div>
  )
}
