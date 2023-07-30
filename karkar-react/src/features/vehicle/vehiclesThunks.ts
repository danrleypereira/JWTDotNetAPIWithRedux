// import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../../store'
import { vehicles } from '../../services'
import { PaginatedResponse, Pagination, Veiculo } from '../../types'
import { fetchDataSuccess, updatePaginationAction, vehicleHoveredAction } from './vehiclesActions'
import { GenericAction } from './vehiclesTypes'
import { UPDATE_VEHICLES } from './actionTypes'

export const fetchVehiclesThunk = (
  page: number = 1,
  pageSize: number = 10
): ThunkAction<void, RootState, unknown, GenericAction> => async (dispatch) => {
  try {
    const response: PaginatedResponse = await vehicles.fetchVeiculos(
      page,
      pageSize
    )
    dispatch(fetchDataSuccess(response.veiculos))
    const pagination: Pagination = {
      nextPage: response.nextPage,
      previousPage: response.previousPage,
      totalPages: response.totalPages,
      currentPage: response.currentPage,
      pageSize: pageSize,
    }
    dispatch(updatePaginationAction(pagination))
  } catch (error) {
    console.error(error)
    dispatch({
      type: UPDATE_VEHICLES,
      payload: [
        {
          id: 1,
          marca: '',
          modelo: 'Erro',
          nome: 'Erro ao carregar veículos',
          foto:
            'https://external-preview.redd.it/KhSZPgxeJkvCo2OEUO23wuhjh5r5nskAuns1y6iA6xI.jpg?auto=webp&s=7f19fca1815f55fd4a944d06cec132ee4e93dc4c',
          valor: 9999999,
        },
      ],
    })
    // dispatch({ type: FETCH_DATA_FAILURE, error });
  }
}

// update vehicle by id thunk
export const updateVehicleThunk = (
  veiculo: Veiculo,
  token: string
): ThunkAction<void, RootState, unknown, GenericAction> => async (dispatch) => {
  try {
    await vehicles.updateVeiculoById(veiculo, token)
    dispatch(fetchVehiclesThunk())
    dispatch(vehicleHoveredAction(veiculo))
  } catch (error) {
    console.error(error)
    throw error
  }
}
// add vehicle thunk
export const addVehicleThunk = (
  veiculo: Veiculo,
  token: string
): ThunkAction<void, RootState, unknown, GenericAction> => async (dispatch) => {
  try {
    await vehicles.addVeiculo(veiculo, token)
    dispatch(fetchVehiclesThunk())
    dispatch(vehicleHoveredAction(veiculo))
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteVehicleThunk = (
  id: number,
  token: string
): ThunkAction<void, RootState, unknown, GenericAction> => async (dispatch) => {
  try {
    await vehicles.deleteVeiculoById(id, token)
    dispatch(fetchVehiclesThunk())
    dispatch(vehicleHoveredAction({} as Veiculo))
  } catch (error) {
    console.error(error)
    throw error
  }
}

