import { User, Token } from '../../types'
import {
    SET_TOKEN,
    SET_USER,
} from './actionTypes'

const addUserAction = (user: User) => ({
    type: SET_USER,
    payload: user,
})

const setTokenAction = (token: Token) => ({
    type: SET_TOKEN,
    payload: token,
})

export {
    addUserAction,
    setTokenAction,
}