import {
  UPDATE_VEHICLES,
  FETCH_DATA_SUCCESS,
  UPDATE_PAGINATION,
  VEHICLE_HOVERED,
} from './actionTypes'
import { Pagination, Veiculo } from '../../types'

interface UpdateVehicleAction {
  type: typeof UPDATE_VEHICLES
  payload: Veiculo[]
}

export interface HoveredVehicleAction {
  type: typeof VEHICLE_HOVERED
  payload: Veiculo
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

export type GenericAction = {
  type: string
  payload: Object
}

export type VehiclesActionTypes =
  | UpdateVehicleAction
  | FetchDataSuccessAction
  | UpdatePaginationAction
  | HoveredVehicleAction

export interface SystemState {
  vehicles: {
    value: Veiculo[]
    pagination: Pagination,
    destaque: Veiculo
  }
}
