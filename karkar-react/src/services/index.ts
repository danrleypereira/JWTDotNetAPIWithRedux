import { PaginatedResponse } from '../types'
import apiConfig from './apiConfig'

export async function fetchVeiculos(
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
