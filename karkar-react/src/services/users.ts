import { User, LoginResponse, UserRequest } from '../types'
import apiConfig from './apiConfig'

async function signUp(user: User): Promise<User> {
  const apiUrl = apiConfig.users.signup()

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

async function login(user: UserRequest): Promise<LoginResponse> {
  const apiUrl = apiConfig.users.login()

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export default { signUp, login }
