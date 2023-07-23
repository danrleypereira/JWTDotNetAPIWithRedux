// import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store';
import { fetchVeiculos } from '../../../services/index';
import { PaginatedResponse, Veiculo } from '../../../types'; 

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

export const fetchVehiclesThunk = (
    page: number,
    pageSize: number
  ): ThunkAction<void, RootState, unknown, VehicleAction> => async (dispatch) => {
    try {
      const response: PaginatedResponse = await fetchVeiculos(page, pageSize);
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.veiculos });
    } catch (error) {
      // Handle errors
    }
  };
  
  // Define the type for your VehicleAction
  type VehicleAction = {
    type: string;
    payload: Veiculo[];
  };
