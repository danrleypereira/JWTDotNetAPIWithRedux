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
      <div>
        {vehiclesState.length !== 0 && vehiclesState.map((vehicle) => (
          <div key={vehicle.id} className="card">
            <img src={vehicle.foto} alt={vehicle.nome} />
            <div className="card-content">
              <h2>{vehicle.marca} - {vehicle.modelo}</h2>
              <p>{vehicle.nome}</p>
              <p>Price: ${vehicle.valor}</p>
              {/* Display other properties as needed */}
            </div>
          </div>
        ))}
      </div>
      <ul className="pagination">
        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
        <li className="active"><a href="#!">1</a></li>
        <li className="waves-effect"><a href="#!">2</a></li>
        <li className="waves-effect"><a href="#!">3</a></li>
        <li className="waves-effect"><a href="#!">4</a></li>
        <li className="waves-effect"><a href="#!">5</a></li>
        <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
      </ul>
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
