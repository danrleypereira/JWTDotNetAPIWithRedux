import { SET_TOKEN, SET_USER } from './actionTypes'

import { User, Token } from '../../types'

interface SetUserAction {
  type: typeof SET_USER
  payload: User
}

export type GenericAction = {
  type: string
  payload: Object
}

interface SetTokenAction {
  type: typeof SET_TOKEN
  payload: Token
}

export type UserActionTypes = SetUserAction | SetTokenAction

export interface SystemState {
  user: {
    value: User
    token: Token
  }
}
