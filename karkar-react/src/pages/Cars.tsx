import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectors } from '../features/vehicle'
import { fetchVehiclesThunk } from '../features/vehicle/vehiclesThunks'
import { vehicleHoveredAction } from '../features/vehicle/vehiclesActions'
import { AppDispatch } from '../store'
import HoveredVehicle from '../components/HoveredVehicle'
import CarsList from '../components/CarsList'
import { Veiculo } from '../types'
import Pagination from '../components/Pagination'

export const Cars: React.FC = () => {
  const vehicles = useSelector(selectors.getVehiclesValue)
  const pagination = useSelector(selectors.getVehiclesPagination)
  const hoveredVehicle = useSelector(selectors.getHoveredVehicle)
  const dispatch = useDispatch<AppDispatch>()

  //create useEffect to fetch data from api and dispatch action
  useEffect(() => {
    if (vehicles.length === 0)
      dispatch(fetchVehiclesThunk(pagination.currentPage, pagination.pageSize))
  }, [dispatch, pagination.currentPage, pagination.pageSize])

  return (
    <Fragment>
      {/* if exists hovered vehicle show only hovered component */}
      {Object.keys(hoveredVehicle).length !== 0 ? (
        <HoveredVehicle />
      ) : (
        <Fragment>
          <Pagination />
          <CarsList />
        </Fragment>
      )}
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => dispatch(vehicleHoveredAction({} as Veiculo))}
      >
        Go to CarsList
      </button>
    </Fragment>
  )
}
