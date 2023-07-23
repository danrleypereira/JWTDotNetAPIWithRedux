import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectors } from '../features/vehicle'
import { actionTypes } from '../features/vehicle'
import { fetchVeiculos } from '../services/index'
import { Veiculo } from '../types'

export const Cars: React.FC = () => {
  const vehicles = useSelector(selectors.getVehiclesValue)
  const [vehiclesState, setVehicleState] = useState<Veiculo[]>([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function fetchData() {
    try {
      const page = 1;
      const pageSize = 10;

      const veiculos: Veiculo[] = await fetchVeiculos(page, pageSize);
      // const paginatedResponse: PaginatedResponse = await fetchVeiculos(page, pageSize);
      setVehicleState(veiculos);
      dispatch({ type: actionTypes.FETCH_DATA_SUCCESS, payload: veiculos });
      console.log(veiculos);
    } catch (error) {
      // Handle errors here
    }
  }

  //create useEffect to fetch data from api and dispatch action
  useEffect(() => {
    console.log(vehicles);

    if (vehiclesState.length === 0) fetchData();
    dispatch({ type: actionTypes.UPDATE_VEHICLES })
    console.log(vehiclesState);

  }, [vehiclesState]);

  return (
    <Fragment>
      <h1>Cars</h1>
      <ul className="pagination">
        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
        <li className="active"><a href="#!">1</a></li>
        <li className="waves-effect"><a href="#!">2</a></li>
        <li className="waves-effect"><a href="#!">3</a></li>
        <li className="waves-effect"><a href="#!">4</a></li>
        <li className="waves-effect"><a href="#!">5</a></li>
        <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
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
