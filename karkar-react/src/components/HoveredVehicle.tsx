import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectors as vehiclesSelector } from '../features/vehicle'
import { selectors as userSelectors } from '../features/user'
import { AppDispatch } from '../store'
import { deleteVehicleThunk } from '../features/vehicle/vehiclesThunks'

const HoveredVehicle: React.FC = () => {
  const hoveredVehicle = useSelector(vehiclesSelector.getHoveredVehicle)
  const token = useSelector(userSelectors.getUserToken)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    
    }, [token])

  const realConverter = (value: number) => {
    if(value)
      return "R$ "+Number(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    else return ''
  }

  return (
    <Fragment>
      <h1>Hovered vehicle</h1>
      <div className="row">
        {hoveredVehicle && (
          <div className="col s12 m5">
            <div className="card">
              <div className="card-image">
                <img
                  className="responsive-img"
                  src={hoveredVehicle.foto}
                  alt={hoveredVehicle.nome}
                />
              </div>
              <div className="card-content">
                <h2 className="car-name">{hoveredVehicle.nome}</h2>
                <p className="car-details">
                  {hoveredVehicle.modelo} • {hoveredVehicle.marca}
                </p>
                <span className="payment-total payment-highlight">
                  {hoveredVehicle && Object.keys(hoveredVehicle).length != 0 &&
                    realConverter(hoveredVehicle?.valor)
                  }
                </span>
              </div>
              {/* Create buttons to edit and delete */}
              {/* Only show these buttons if the user is logged in */}
              {Object.keys(token).length !== 0 &&
              new Date(token.expiration) > new Date(Date.now()) ? (
                <div className="card-action">
                  <button
                    className="waves-effect waves-light btn-small"
                    onClick={() => navigate(`/edit/${hoveredVehicle.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="waves-effect waves-light btn-small"
                    onClick={() =>
                      dispatch(
                        deleteVehicleThunk(hoveredVehicle.id, token.token)
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}
export default HoveredVehicle
