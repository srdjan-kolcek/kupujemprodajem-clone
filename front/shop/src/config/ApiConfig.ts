export interface ApiConfig {
    method: string;
    headers: { [key: string]: string };
    body?: string;
}