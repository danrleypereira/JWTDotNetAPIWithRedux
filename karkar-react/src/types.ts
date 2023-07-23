export interface Veiculo {
  id: number
  marca: string
  modelo: string
  nome: string
  foto: string
  valor: number
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
