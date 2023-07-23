import { SystemState } from './vehiclesTypes'

export const getVehiclesValue = (state: SystemState) => state.vehicles.value
export const getVehiclesPagination = (state: SystemState) =>
  state.vehicles.pagination
export const getHoveredVehicle = (state: SystemState) => state.vehicles.destaque