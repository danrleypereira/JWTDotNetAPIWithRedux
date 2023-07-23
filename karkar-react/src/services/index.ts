import { Veiculo } from "../types";

interface PaginatedResponse {
    veiculos: Veiculo[];
    currentPage: number;
    nextPage: number;
    previousPage: number;
    totalPages: number;
}

export async function fetchVeiculos(page: number, pageSize: number): Promise<Veiculo[]> {
    const apiUrl = `https://localhost:7247/api/Veiculos/Paginated?page=${page}&pageSize=${pageSize}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data: PaginatedResponse = await response.json();
        return data.veiculos;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}