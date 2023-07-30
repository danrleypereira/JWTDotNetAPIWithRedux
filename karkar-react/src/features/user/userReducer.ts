/* eslint-disable @typescript-eslint/default-param-last */

import {
    SET_TOKEN,
    SET_USER,
} from './actionTypes'

import { UserActionTypes } from './usersTypes'
import { User, Token } from '../../types'

const initialState = {
    value: {} as User,
    token: {} as Token,
}

export default (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, value: action.payload }
        case SET_TOKEN:
            return { ...state, token: action.payload }
        default:
            return state
    }
}