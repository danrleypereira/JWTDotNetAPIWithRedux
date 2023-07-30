export interface Veiculo {
  id: number
  marca: string
  modelo: string
  nome: string
  foto: string
  valor: number
}

export interface User {
  id: number | null
  email: string
  password: string | null
  userRoles: Role[] | null
}

export interface UserRequest {
  email: string
  senha: string
}

export interface Token {
  token: string
  expiration: string
  roles: string[]
}

export interface Role {
  id: number
  name: string
}

export interface LoginResponse {
  token: string
  expiration: string
  roles: string[]
}

export interface PaginatedResponse {
  veiculos: Veiculo[]
  currentPage: number
  nextPage: number
  previousPage: number
  totalPages: number
}

export interface Pagination {
  currentPage: number
  nextPage: number
  previousPage: number
  totalPages: number
  pageSize: number
}
