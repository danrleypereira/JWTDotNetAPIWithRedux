const API_BASE_URL: string = process.env.REACT_APP_API || ''

export default {
  veiculos: {
    paginated: (page: number, pageSize: number) =>
      `${API_BASE_URL}/Veiculos/Paginated?page=${page}&pageSize=${pageSize}`,
    // Add other API endpoints here if needed
  },
}
