// import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../../store'
import { fetchVeiculos } from '../../services'
import { PaginatedResponse, Pagination } from '../../types'
import { fetchDataSuccess, updatePaginationAction } from './vehiclesActions'
import { GenericAction } from './vehiclesTypes'
import { UPDATE_VEHICLES } from './actionTypes'

export const fetchVehiclesThunk = (
  page: number = 1,
  pageSize: number = 10
): ThunkAction<void, RootState, unknown, GenericAction> => async (
  dispatch
) => {
  try {
    const response: PaginatedResponse = await fetchVeiculos(page, pageSize)
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

// // Thunk action to fetch vehicles from the API
// export const fetchVehiclesThunk = createAsyncThunk<Veiculo[], { page: number; pageSize: number }>(
//   'vehicle/fetchVehicles',
//   async ({ page, pageSize }, { rejectWithValue }) => {
//     try {
//       const response: PaginatedResponse = await fetchVeiculos(page, pageSize);
//       return response.veiculos;
//     } catch (error) {
//       return rejectWithValue(error.message); // Handle errors
//     }
//   }
// );
