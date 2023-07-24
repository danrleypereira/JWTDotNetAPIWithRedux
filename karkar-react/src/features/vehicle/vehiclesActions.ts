import { Pagination, Veiculo } from '../../types'
import {
  FETCH_DATA_SUCCESS,
  UPDATE_PAGINATION,
  VEHICLE_HOVERED,
} from './actionTypes'
import { VehicleAction, GenericAction } from './vehiclesTypes'

const addVehicleAction = (vehicle: Veiculo) => ({
  type: 'vehicle/vehicleAdded',
  payload: vehicle,
})

const fetchDataSuccess = (vehicles: Veiculo[]): VehicleAction => ({
  type: FETCH_DATA_SUCCESS,
  payload: vehicles,
})

const updatePaginationAction = (pagination: Pagination): GenericAction => ({
  type: UPDATE_PAGINATION,
  payload: pagination,
})

const vehicleHoveredAction = (vehicle: Veiculo): GenericAction => ({
  type: VEHICLE_HOVERED,
  payload: vehicle,
})

export {
  addVehicleAction,
  fetchDataSuccess,
  updatePaginationAction,
  vehicleHoveredAction,
}
