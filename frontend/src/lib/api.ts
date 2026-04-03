import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Settings API
export const fetchSettings = async () => {
  const { data } = await apiClient.get('/settings');
  return data;
};

export const updateSettings = async (settings: any) => {
  const { data } = await apiClient.post('/settings', settings);
  return data;
};

// Automation API
export const triggerAutomation = async () => {
  const { data } = await apiClient.post('/trigger-automation');
  return data;
};

// Dashboard Stats API
export const fetchDashboardStats = async () => {
  const { data } = await apiClient.get('/stats/dashboard');
  return data;
};
