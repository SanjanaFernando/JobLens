import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '', // Uses Vite proxy
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for token refresh & standard error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Session expired or unauthorized request');
    }
    return Promise.reject(error);
  }
);

export interface SystemHealth {
  status: string;
  service: string;
  aiModelConfigured: string;
  hasGeminiKey: boolean;
  timestamp: string;
}

export const fetchSystemHealth = async (): Promise<SystemHealth> => {
  const response = await apiClient.get<SystemHealth>('/api/health');
  return response.data;
};

export const fetchActuatorHealth = async () => {
  const response = await apiClient.get('/actuator/health');
  return response.data;
};
