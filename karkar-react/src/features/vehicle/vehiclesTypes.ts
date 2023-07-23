import { UPDATE_VEHICLES, FETCH_DATA_SUCCESS } from './actionTypes'
import { Veiculo } from '../../types';

interface UpdateVehicleAction {
  type: typeof UPDATE_VEHICLES
  payload: Veiculo[]
}

interface FetchDataSuccessAction {
  type: typeof FETCH_DATA_SUCCESS
  payload: Veiculo[]
}

export type VehiclesActionTypes = UpdateVehicleAction | FetchDataSuccessAction

export interface SystemState {
  vehicles: {
    value: Veiculo[]
  }
}
