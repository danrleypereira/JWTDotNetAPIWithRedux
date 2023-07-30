import { PaginatedResponse, Veiculo } from '../types'
import apiConfig from './apiConfig'

async function fetchVeiculos(
  page: number,
  pageSize: number
): Promise<PaginatedResponse> {
  const apiUrl = apiConfig.veiculos.paginated(page, pageSize)

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    const data: PaginatedResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

async function fetchVeiculoById(id: number): Promise<Veiculo> {
  const apiUrl = apiConfig.veiculos.byId(id)

  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

async function updateVeiculoById(veiculo: Veiculo, token: string): Promise<undefined> {
  const apiUrl = apiConfig.veiculos.updateById(veiculo.id)

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT', // or 'POST'
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(veiculo),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

async function addVeiculo(veiculo: Veiculo, token: string): Promise<Veiculo> {
  const apiUrl = apiConfig.veiculos.saveVehicle()

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(veiculo),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

//delete vehicle by id
async function deleteVeiculoById(id: number, token: string): Promise<void> {
  const apiUrl = apiConfig.veiculos.deleteById(id)
  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export default {
  fetchVeiculoById,
  fetchVeiculos,
  updateVeiculoById,
  addVeiculo,
  deleteVeiculoById,
}
