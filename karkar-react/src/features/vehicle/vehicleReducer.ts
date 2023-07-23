/* eslint-disable @typescript-eslint/default-param-last */

import { UPDATE_VEHICLES, FETCH_DATA_SUCCESS } from './actionTypes'
import { VehiclesActionTypes } from './vehiclesTypes'
import { Veiculo } from '../../types';

const initialState = {
  value: [] as Veiculo[],
}

export default (state = initialState, action: VehiclesActionTypes) => {
  switch (action.type) {
    case UPDATE_VEHICLES:
      return { ...state, value: action.payload }
    case FETCH_DATA_SUCCESS:
      return {...state, value: action.payload}
    default:
      return state
  }
}
