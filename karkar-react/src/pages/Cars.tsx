import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectors } from '../features/vehicle'
import { fetchVehiclesThunk } from '../features/vehicle/vehiclesThunks'
import { updatePaginationAction } from '../features/vehicle/vehiclesActions'
import { AppDispatch } from '../store'

export const Cars: React.FC = () => {
  const vehicles = useSelector(selectors.getVehiclesValue)
  const pagination = useSelector(selectors.getVehiclesPagination)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  //create useEffect to fetch data from api and dispatch action
  useEffect(() => {
    console.log(vehicles)
    if (vehicles.length === 0)
      dispatch(fetchVehiclesThunk(pagination.currentPage, pagination.pageSize))
  }, [dispatch, pagination.currentPage, pagination.pageSize])

  const previousEvent = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (pagination.previousPage === -1) {
      e.stopPropagation()
      return
    }
    dispatch(
      updatePaginationAction({
        ...pagination,
        currentPage: pagination.previousPage,
      })
    )
    dispatch(fetchVehiclesThunk(pagination.previousPage, pagination.pageSize))
    dispatch(fetchVehiclesThunk(pagination.previousPage, pagination.pageSize))
  }

  const nextEvent = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pagination.currentPage === pagination.totalPages) {
      e.stopPropagation()
      return
    }
    dispatch(
      updatePaginationAction({
        ...pagination,
        currentPage: pagination.currentPage + 1,
      })
    )
    dispatch(
      fetchVehiclesThunk(pagination.currentPage + 1, pagination.pageSize)
    )
  }

  return (
    <Fragment>
      <h1>Cars</h1>
      <ul className="pagination">
        <li
          className={`${
            pagination.previousPage === -1 ? 'disabled' : 'waves-effect'
          }`}
        >
          <a href="#!" onClick={(e) => previousEvent(e)}>
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        {Array.from({ length: pagination.totalPages }).map((_, index) => (
          <li
            key={index}
            className={`${
              index + 1 === pagination.currentPage ? 'active' : 'waves-effect'
            }`}
          >
            <a
              href="#!"
              onClick={() => {
                dispatch(
                  updatePaginationAction({
                    ...pagination,
                    currentPage: index + 1,
                  })
                )
                dispatch(fetchVehiclesThunk(index + 1, pagination.pageSize))
              }}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li
          className={`${
            pagination.currentPage === pagination.totalPages
              ? 'disabled'
              : 'waves-effect'
          }`}
        >
          <a href="#!" onClick={(e) => nextEvent(e)}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>

      <div className="row">
        {vehicles.length !== 0 &&
          vehicles.map((vehicle) => (
            <div key={vehicle.id} className="col s11 m5 card-panel card">
              <div className="card-header">
                <img
                  className="responsive-img"
                  src={vehicle.foto}
                  alt={vehicle.nome}
                />
              </div>
              <div className="card-body center-align">
                <h2 className="car-name">{vehicle.nome}</h2>
                <p className="car-details">
                  {vehicle.modelo} • {vehicle.marca}
                </p>
                <span className="payment-total payment-highlight">
                  R$&nbsp;
                  {vehicle.valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </span>
              </div>
            </div>
          ))}
      </div>
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => navigate('/')}
      >
        Go back
      </button>
    </Fragment>
  )
}
