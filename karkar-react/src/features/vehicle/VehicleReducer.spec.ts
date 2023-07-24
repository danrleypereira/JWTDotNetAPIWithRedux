import vehicleReducer from './vehicleReducer'
import { UPDATE_VEHICLES } from './actionTypes'
import { VehiclesActionTypes } from './vehiclesTypes'
import { Pagination, Veiculo } from '../../types'

describe('features > vehicle > vehicleReducer', () => {
  test(`updates vehicles in state when ${UPDATE_VEHICLES} action is provided`, () => {
    const initialState = {
      value: [] as Veiculo[],
      pagination: {} as Pagination,
      destaque: {} as Veiculo,
    }

    const expectedState = {
      value: [
        {
          id: 1,
          marca: 'Toyota',
          modelo: 'Corolla',
          nome: 'Corolla XLE',
          foto: 'https://example.com/corolla.jpg',
          valor: 25000,
        },
      ],
    }

    const action: VehiclesActionTypes = {
      type: UPDATE_VEHICLES,
      payload: [
        {
          id: 1,
          marca: 'Toyota',
          modelo: 'Corolla',
          nome: 'Corolla XLE',
          foto: 'https://example.com/corolla.jpg',
          valor: 25000,
        },
      ],
    }

    expect(vehicleReducer(initialState, action)).toEqual(expectedState)
  })
})
