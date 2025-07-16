import { API_BASE_URL } from "../constants";

interface ApiConfig {
    method: string;
    headers: { [key: string]: string };
    body?: string;
}

export const apiRequest = async <T>(endpoint: string, method: string = 'GET', data: any = null): Promise<T> => {
    const url = `${API_BASE_URL}/${endpoint}`;
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
        // Add any authorization headers here if needed later, e.g.:
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

    const config: ApiConfig = {
        method,
        headers,
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null as T;
        }

        return await response.json() as T;
    } catch (error: any) {
        console.error(`API Request Error [${method} ${url}]:`, error);
        throw error;
    }
};

export const api = {
    get: <T>(endpoint: string) => apiRequest<T>(endpoint, 'GET'),
    post: <T>(endpoint: string, data: any) => apiRequest<T>(endpoint, 'POST', data),
    put: <T>(endpoint: string, data: any) => apiRequest<T>(endpoint, 'PUT', data),
    delete: <T>(endpoint: string) => apiRequest<T>(endpoint, 'DELETE'),
};
