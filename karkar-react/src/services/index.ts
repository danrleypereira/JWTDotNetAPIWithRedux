import { PaginatedResponse } from "../types";

export async function fetchVeiculos(page: number, pageSize: number): Promise<PaginatedResponse> {
    const apiUrl = `https://localhost:7247/api/Veiculos/Paginated?page=${page}&pageSize=${pageSize}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data: PaginatedResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}