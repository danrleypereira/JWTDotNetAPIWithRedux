import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectors } from '../features/vehicle'
import { actionTypes } from '../features/vehicle'
import { fetchVeiculos } from '../services/index'
import { Veiculo, PaginatedResponse } from '../types'

export const Cars: React.FC = () => {
  const vehicles = useSelector(selectors.getVehiclesValue)
  const [vehiclesState, setVehicleState] = useState<Veiculo[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [previousPage, setPreviousPage] = useState(-1)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function fetchData(page: number) {
    try {
      // const veiculos: Veiculo[] = await fetchVeiculos(page, pageSize);
      const paginatedResponse: PaginatedResponse = await fetchVeiculos(page, pageSize);
      setVehicleState(paginatedResponse.veiculos);
      setCurrentPage(paginatedResponse.currentPage);
      setTotalPages(paginatedResponse.totalPages);
      setPreviousPage(paginatedResponse.previousPage);
      dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: paginatedResponse.veiculos });
      console.log(paginatedResponse.veiculos);
    } catch (error) {
      // Handle errors here
    }
  }

  //create useEffect to fetch data from api and dispatch action
  useEffect(() => {
    console.log(vehicles);

    if (vehiclesState.length === 0) fetchData(currentPage);
    dispatch({ type: actionTypes.UPDATE_VEHICLES })
    console.log(vehiclesState);

  }, [vehiclesState]);

  const previousEvent = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (previousPage === -1) {
      e.stopPropagation();
      return;
    }
    setCurrentPage(previousPage);
    fetchData(previousPage)
  };

  const nextEvent = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (currentPage === totalPages) {
      e.stopPropagation();
      return;
    }
    setCurrentPage(currentPage + 1)
    fetchData(currentPage + 1)
  };

  return (
    <Fragment>
      <h1>Cars</h1>
      <ul className="pagination">
        <li className={`${previousPage === -1 ? "disabled" : "waves-effect"}`}>
          <a href="#!" onClick={(e) => previousEvent(e)}>
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index} className={`${index + 1 === currentPage ? "active" : "waves-effect"}`}>
            <a href="#!" onClick={() => { setCurrentPage(index + 1); fetchData(index + 1) }}>
              {index + 1}
            </a>
          </li>
        ))}
        <li className={`${currentPage === totalPages ? "disabled" : "waves-effect"}`}>
          <a href="#!" onClick={(e) => nextEvent(e)}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>


      <div className='row'>
        {vehiclesState.length !== 0 &&
          vehiclesState.map((vehicle) => (
            <div key={vehicle.id} className="col s11 m5 card-panel card">
              <div className="card-header">
                <img className='responsive-img' src={vehicle.foto} alt={vehicle.nome} />
              </div>
              <div className="card-body center-align">
                <h2 className="car-name">{vehicle.nome}</h2>
                <p className="car-details">{vehicle.modelo} • {vehicle.marca}</p>
                <span className="payment-total payment-highlight">
                  R$&nbsp;{vehicle.valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
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
