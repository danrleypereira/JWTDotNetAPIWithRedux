import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectors } from '../features/vehicle'
import { fetchVehiclesThunk } from '../features/vehicle/vehiclesThunks'
import { updatePaginationAction } from '../features/vehicle/vehiclesActions'
import { AppDispatch } from '../store'

const Pagination: React.FC = () => {
  const pagination = useSelector(selectors.getVehiclesPagination)
  const dispatch = useDispatch<AppDispatch>()

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
  )
}

export default Pagination
