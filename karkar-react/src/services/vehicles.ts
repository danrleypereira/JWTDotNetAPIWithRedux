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

async function updateVeiculoById(veiculo: Veiculo): Promise<Veiculo> {
  const apiUrl = apiConfig.veiculos.updateById(veiculo.id)

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT', // or 'POST'
      headers: {
        'Content-Type': 'application/json',
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

export default { fetchVeiculoById, fetchVeiculos, updateVeiculoById }
