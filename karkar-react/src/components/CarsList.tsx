import { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectors } from '../features/vehicle'
import { fetchVehiclesThunk } from '../features/vehicle/vehiclesThunks'
import { AppDispatch } from '../store'
import { vehicleHoveredAction } from '../features/vehicle/vehiclesActions'

const CarsList: React.FC = () => {
  const vehicles = useSelector(selectors.getVehiclesValue)
  const pagination = useSelector(selectors.getVehiclesPagination)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (vehicles.length === 0)
      dispatch(fetchVehiclesThunk(pagination.currentPage, pagination.pageSize))
  }, [dispatch, pagination.currentPage, pagination.pageSize])

  const vehicleClicked = (id: number) => {
    const vehicle = vehicles.find((v) => v.id === id)

    if (vehicle) {
      dispatch(vehicleHoveredAction(vehicle))
    } else {
      // Handle the case where no vehicle is found.
      // This could involve dispatching a different action,
      // showing an error message, etc.
      console.error(`No vehicle found with id ${id}`)
    }
  }

  const realConverter = (value: number) => {
    if(value)
      return "R$ "+Number(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    else return ''
  }

  return (
    <Fragment>
      <div className="row">
        {Object.keys(vehicles).length !== 0 &&
          vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="col s11 m5 card-panel card"
              onClick={() => vehicleClicked(vehicle.id)}
            >
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
                  {realConverter(vehicle?.valor)}
                </span>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  )
}

export default CarsList
