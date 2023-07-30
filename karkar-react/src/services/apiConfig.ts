const API_BASE_URL: string = process.env.REACT_APP_API || ''

export default {
  veiculos: {
    paginated: (page: number, pageSize: number) =>
      `${API_BASE_URL}/Veiculos/Paginated?page=${page}&pageSize=${pageSize}`,
    byId: (id: number) => `${API_BASE_URL}/Veiculos/${id}`,
    updateById: (id: number) => `${API_BASE_URL}/Veiculos/${id}`,
    deleteById: (id: number) => `${API_BASE_URL}/Veiculos/${id}`,
    getAll: () => `${API_BASE_URL}/Veiculos`,
  },
  users: {
    login: () => `${API_BASE_URL}/Users/BearerToken`,
    signup: () => `${API_BASE_URL}/Users`,
    addRole: (userId: number, roleName: string) => `${API_BASE_URL}/Users/${userId}/roles/${roleName}`,
    removeRole: (userId: number, roleName: string) => `${API_BASE_URL}/Users/${userId}/roles/${roleName}`
  },
}