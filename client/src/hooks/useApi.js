import { useState, useCallback } from 'react';
import api from '../services/api';

export function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (method, url, body = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = method === 'get' 
        ? await api.get(url)
        : await api[method](url, body);
      setData(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
}
