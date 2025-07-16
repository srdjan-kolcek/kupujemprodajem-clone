import axios from 'axios';
import { Oglas } from '../models/Oglas.model';
import { API_BASE_URL } from '../constants';

const endpoint = `${API_BASE_URL}/oglasi`;

export const oglasService = {
  async fetchAll(): Promise<Oglas[]> {
    const response = await axios.get<Oglas[]>(endpoint);
    return response.data;
  },

  async fetchById(id: number): Promise<Oglas> {
    const response = await axios.get<Oglas>(`${endpoint}/${id}`);
    return response.data;
  },

  async create(oglas: Omit<Oglas, 'id'>): Promise<Oglas> {
    const response = await axios.post<Oglas>(endpoint, oglas);
    return response.data;
  },

  async update(id: number, updatedOglas: Partial<Oglas>): Promise<Oglas> {
    const response = await axios.put<Oglas>(`${endpoint}/${id}`, updatedOglas);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${endpoint}/${id}`);
  },
};
