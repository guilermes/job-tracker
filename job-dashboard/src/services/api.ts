import axios from 'axios';
import type { ApiResponse } from '../types/Job.ts';

const api = axios.create({
  baseURL: 'https://job-tracker-api-hj8t.onrender.com', // URL que definimos no server.js
});

export const getVagas = async (cargo: string): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>(`/api/vagas?cargo=${cargo}`);
  return response.data;
};