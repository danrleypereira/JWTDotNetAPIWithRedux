import {
  UPDATE_VEHICLES,
  FETCH_DATA_SUCCESS,
  UPDATE_PAGINATION,
} from './actionTypes'
import { Pagination, Veiculo } from '../../types'

interface UpdateVehicleAction {
  type: typeof UPDATE_VEHICLES
  payload: Veiculo[]
}

export interface FetchDataSuccessAction {
  type: typeof FETCH_DATA_SUCCESS
  payload: Veiculo[]
}

export interface UpdatePaginationAction {
  type: typeof UPDATE_PAGINATION
  payload: Pagination
}

export type VehicleAction = {
  type: string
  payload: Veiculo[]
}

export type PaginationAction = {
  type: string
  payload: Object
}

export type VehiclesActionTypes =
  | UpdateVehicleAction
  | FetchDataSuccessAction
  | UpdatePaginationAction

export interface SystemState {
  vehicles: {
    value: Veiculo[]
    pagination: Pagination
  }
}
