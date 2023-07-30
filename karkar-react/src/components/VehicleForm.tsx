import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  updateVehicleThunk,
  addVehicleThunk,
} from '../features/vehicle/vehiclesThunks'
import { selectors as vehiclesSelector } from '../features/vehicle'
import { selectors as usersSelector } from '../features/user'
import { AppDispatch } from '../store'
import { Veiculo } from '../types'

export const VehicleForm: React.FC = () => {
  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const vehicleHovered = useSelector(vehiclesSelector.getHoveredVehicle)
  const token = useSelector(usersSelector.getUserToken)

  const [vehicle, setVehicle] = useState<Veiculo>({
    id: vehicleHovered.id || 0,
    nome: vehicleHovered.nome || '',
    marca: vehicleHovered.marca || '',
    modelo: vehicleHovered.modelo || '',
    valor: vehicleHovered.valor || 0,
    foto: vehicleHovered.foto || '',
  })
  const [id, setId] = useState<string>('')

  const isValidToken = () => {
    return token && token.expiration && new Date(token.expiration) > new Date(Date.now())
  }
//   const getParamId = async () => {
//     if (isValidToken()) {
//       let paramId = await searchParams.get('id')
//       console.log({ paramId })
//       setId(searchParams.get('id') || 'new')
//       if (id === 'new') {
//         console.log({ new: 'newRoute' })
//         setVehicle({} as Veiculo)
//       }
//     } else {
//       navigate('/login')
//     }
//   }

  useEffect(() => {
    if (isValidToken()) {
      let paramId = window.location.toString().split('/')
      let idLocal = paramId[paramId.length - 1]
      setId(idLocal == 'new' ? 'new' : idLocal)
      if (id === 'new')
        setVehicle({} as Veiculo)
    } else
      navigate('/login')
  }, [token, searchParams, navigate, id])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (vehicle && isValidToken()) {
      try {
        if (id == 'new') {
          dispatch(addVehicleThunk(vehicle, token.token))
        } else {
          dispatch(updateVehicleThunk(vehicle, token.token))
        }
        navigate('/cars')
      } catch (err) {
        console.error(err)
        alert(
          'Você não tem permissão para realizar esta ação. Faça login novamente.'
        )
        navigate('/login')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Vehicle Name:
        <input
          type="text"
          name="nome"
          value={vehicle?.nome}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Brand:
        <input
          type="text"
          name="marca"
          value={vehicle?.marca}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Model:
        <input
          type="text"
          name="modelo"
          value={vehicle?.modelo}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Value:
        <input
          type="number"
          name="valor"
          value={vehicle?.valor}
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Photo:
        <input
          type="text"
          name="foto"
          value={vehicle?.foto}
          onChange={handleInputChange}
          required
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  )
}
