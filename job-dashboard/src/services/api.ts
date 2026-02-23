import axios from 'axios';
import type { ApiResponse } from '../types/Job.ts';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL que definimos no server.js
});

export const getVagas = async (cargo: string): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>(`/vagas?cargo=${cargo}`);
  return response.data;
};