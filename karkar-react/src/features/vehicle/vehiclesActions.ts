import { Pagination, Veiculo } from '../../types'
import { FETCH_DATA_SUCCESS, UPDATE_PAGINATION } from './actionTypes'
import { VehicleAction, PaginationAction } from './vehiclesTypes'

const addVehicleAction = (vehicle: Veiculo) => ({
  type: 'vehicle/vehicleAdded',
  payload: vehicle,
})

const fetchDataSuccess = (vehicles: Veiculo[]): VehicleAction => ({
  type: FETCH_DATA_SUCCESS,
  payload: vehicles,
})

const updatePaginationAction = (pagination: Pagination): PaginationAction => ({
  type: UPDATE_PAGINATION,
  payload: pagination,
})

export { addVehicleAction, fetchDataSuccess, updatePaginationAction }
