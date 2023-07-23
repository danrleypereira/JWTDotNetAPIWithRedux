/* eslint-disable @typescript-eslint/default-param-last */

import { UPDATE_VEHICLES, FETCH_DATA_SUCCESS } from './actionTypes'
import { VehiclesActionTypes } from './types'

const initialState = {
  vehicles: []
}

export default (state = initialState, action: VehiclesActionTypes) => {
  switch (action.type) {
    case UPDATE_VEHICLES:
      return { ...state, value: state.vehicles }
    case FETCH_DATA_SUCCESS:
      return {value: state.vehicles, action: action.payload}
    default:
      return state
  }
}
