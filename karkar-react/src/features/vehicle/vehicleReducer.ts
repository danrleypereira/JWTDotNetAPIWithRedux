/* eslint-disable @typescript-eslint/default-param-last */

import {
  UPDATE_VEHICLES,
  FETCH_DATA_SUCCESS,
  UPDATE_PAGINATION,
  VEHICLE_HOVERED,
} from './actionTypes'
import { VehiclesActionTypes } from './vehiclesTypes'
import { Pagination, Veiculo } from '../../types'

const initialState = {
  value: [] as Veiculo[],
  pagination: {} as Pagination,
  destaque: {} as Veiculo,
}

export default (state = initialState, action: VehiclesActionTypes) => {
  switch (action.type) {
    case UPDATE_VEHICLES:
    case FETCH_DATA_SUCCESS:
      return { ...state, value: action.payload }
    case UPDATE_PAGINATION:
      return { ...state, pagination: action.payload }
    case VEHICLE_HOVERED:
      return { ...state, destaque: action.payload }
    default:
      return state
  }
}
