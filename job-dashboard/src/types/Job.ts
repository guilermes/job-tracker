export interface Job {
  _id?: string; // ID do MongoDB
  titulo: string;
  empresa: string;
  local: string;
  link: string;
  logo?: string;
  fonte: string;
}

export interface ApiResponse {
  source: 'cache' | 'api';
  data: Job[];
}